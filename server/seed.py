#!/usr/bin/env python3

from random import randint, choice
from faker import Faker
from datetime import timedelta
from app import app
from models import db, GroceryStore, Employee, Department, employee_department

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
        while True:
            address = fake.address()
            if "Apt" not in address and "Apartment" not in address:
                break
            
        store = GroceryStore(
            name="King Soopers",
            location=f"{fake.street_address()}, {fake.city()}, Colorado"
        )
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
    db.session.add_all(all_departments)
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
                work_hours=f"{randint(20, 40)}",
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

            # Use ORM to add the relationship with the start date and hours worked
            for department in assigned_departments:
                start_date = fake.date_between(start_date='-1y', end_date='today')
                db.session.execute(employee_department.insert().values(
                    employee_id=employee.id,
                    department_id=department.id,
                    hours_worked=randint(20, 40),
                    employee_start_date=start_date
                ))

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
