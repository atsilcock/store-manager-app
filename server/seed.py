#!/usr/bin/env python3

from random import randint, choice
from faker import Faker
from app import app
from models import db, GroceryStore, Employee, Department

roles = {
    "Cashier": ["Produce", "Dairy", "Bakery", "Deli"],
    "Stocker": ["Produce", "Dairy", "Meat", "Deli"],
    "Manager": ["Produce", "Dairy", "Bakery", "Deli", "Meat"],
    "Customer Service Representative": ["Deli", "Bakery"],
    "Butcher": ["Meat"],
    "Baker": ["Bakery"],
    "Produce Clerk": ["Produce"],
    "Dairy/Frozen Foods Clerk": ["Dairy"],
    "Deli Clerk": ["Deli"]
}

def seed_data():
    fake = Faker()

    db.drop_all()
    db.create_all()

    stores = []
    for _ in range(4):
        store = GroceryStore(name=fake.company(), location=fake.address())
        stores.append(store)
    db.session.add_all(stores)
    db.session.commit()

    all_departments = []
    for store in stores:
        departments = [
            Department(name="Bakery", grocery_store=store),
            Department(name="Produce", grocery_store=store),
            Department(name="Dairy", grocery_store=store),
            Department(name="Deli", grocery_store=store),
            Department(name="Meat", grocery_store=store)
        ]
        all_departments.extend(departments)
    db.session.add_all(departments)
    db.session.commit()

    employees = []
    for _ in range(100):
        try:
            role = choice(list(roles.keys()))
            random_store = choice(stores)
            name = fake.name()

            if not name:
                name = "John Doe"

            employee = Employee(
                role=role,
                name=name,
                work_hours=f"{randint(20, 40)} hours",
                grocery_store_id=random_store.id
            )

            db.session.add(employee)

            # Only assign employees to departments matching their roles
            allowed_departments = [d for d in all_departments 
                                   if d.grocery_store_id == random_store.id 
                                   and d.name in roles[role]]

            assigned_departments = [choice(allowed_departments)]
            if randint(0, 1) and len(allowed_departments) > 1:
                assigned_departments.append(choice(allowed_departments))

            employee.departments.extend(assigned_departments)

            employees.append(employee)

        except Exception as e:
            print(f"Error creating employee: {e}")

    db.session.add_all(employees)
    db.session.commit()

    print("Seed complete!")

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()
