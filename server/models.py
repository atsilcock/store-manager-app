from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash


from config import db
from sqlalchemy.orm import validates

class GroceryStore(db.Model, SerializerMixin):
    __tablename__ = 'grocery_store'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    departments = db.relationship('Department', back_populates="grocery_store")

    employees = association_proxy('departments', 'employees')

    serialize_rules =('-departments.grocery_store', )

class Employee(db.Model, SerializerMixin):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    work_hours = db.Column(db.String, nullable=False)
    grocery_store_id = db.Column(db.Integer, db.ForeignKey('grocery_store.id'))
    departments = db.relationship('Department', secondary='employee_department', back_populates='employees')

    serialize_rules = ('-departments.employees')

    @validates('role')
    def validate_role(self, key, role):
        if not role:
            raise ValueError("Role cannot be empty")
        return role

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name cannot be empty")
        return name

    @validates('work_hours')
    def validate_work_hours(self, key, work_hours):
        if not work_hours.isdigit() or int(work_hours) < 0:
            raise ValueError("Work hours must be a non-negative integer")
        return work_hours
        

class Department(db.Model, SerializerMixin):
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    grocery_store_id = db.Column(db.Integer, db.ForeignKey('grocery_store.id'))
    grocery_store = db.relationship('GroceryStore', back_populates='departments')
    employees = db.relationship('Employee', secondary='employee_department', back_populates='departments')

    serialize_rules = ('-employees.departments', '-grocery_store.departments')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name cannot be empty")
        return name

employee_department = db.Table('employee_department',
    db.Column('employee_id', db.Integer, db.ForeignKey('employees.id')),
    db.Column('department_id', db.Integer, db.ForeignKey('departments.id')),
    db.Column('hours_worked', db.Integer, nullable=False, default =0),
    db.Column('employee_start_date', db.Date, nullable=False)
) 
