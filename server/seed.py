#!/usr/bin/env python3

# Standard library imports
from random import randint, choice
from faker import Faker

# Remote library imports
from app import app
from models import db, GroceryStore, Employee, Department

# Define possible roles at a grocery store
roles = [
    "Cashier": ["Produce", "Dairy", "Bakery", "Deli"],
    "Stocker" ["Produce", "Dairy", "Meat", "Deli"],
    "Manager": ["Produce", "Dairy", "Bakery", "Deli", "Meat"],
    "Customer Service Representative",
    "Butcher",
    "Baker",
    "Produce Clerk",
    "Dairy/Frozen Foods Clerk",
    "Deli Clerk"
]

def seed_data():
    fake = Faker()

    # Ensure the database is clear to prevent multiple runs from stacking data
    db.drop_all()  # This will drop all the tables
    db.create_all()  # This will recreate the tables

    # Create exactly 4 grocery stores
    stores = []
    for _ in range(4):  # Create 4 grocery stores
        store = GroceryStore(name=fake.company(), location=fake.address())
        stores.append(store)
    db.session.add_all(stores)
    db.session.commit()

    # Create 5 departments for each store
    all_departments = []
    for store in stores:
        departments = [
            Department(name="Bakery", grocery_store=store),
            Department(name="Produce", grocery_store=store),
            Department(name="Dairy", grocery_store=store),
            Department(name="Deli", grocery_store=store),
            Department(name="Meat", grocery_store=store)  # Added department "Meat"
        ]
        all_departments.extend(departments)
    db.session.add_all(all_departments)
    db.session.commit()

    # Create exactly 100 random employees and assign them to a store and department
    employees = []
    for _ in range(100):  # Generate 100 employees
        try:
            role = choice(roles)
            random_store = choice(stores)  # Randomly select one of the 4 stores
            name = fake.name()  # Generate employee name
            
            if not name:
                print("Generated name is null, setting default name.")
                name = "John Doe"  # Fallback to a default name if Faker fails

            employee = Employee(
                user_name=fake.user_name(),
                role=role,
                name=name,  # Set the name field
                password="password123",  # Hashing handled by the Employee model
                work_hours=f"{randint(20, 40)} hours",
                grocery_store_id=random_store.id  # Assign the foreign key (id) of the random store
            )

            db.session.add(employee)  # Add the employee to the session first

            # Randomly assign employees to 1 or 2 departments within the chosen store
            store_departments = [d for d in all_departments if d.grocery_store_id == random_store.id]
            assigned_departments = [choice(store_departments)]
            if randint(0, 1):  # 50% chance to add another department
                assigned_departments.append(choice(store_departments))

            employee.departments.extend(assigned_departments)  # Now extend the departments

            employees.append(employee)  # Add the employee to the list

        except Exception as e:
            print(f"Error creating employee: {e}")

    # Commit all employees at once
    db.session.add_all(employees)
    db.session.commit()

    print("Seed complete!")

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()
 