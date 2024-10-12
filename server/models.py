from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash


from config import db

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
    password_hash = db.Column(db.String, nullable=False)
    name = db.Column(db.String)
    user_name = db.Column(db.String, nullable = False)
    work_hours = db.Column(db.String)
    grocery_store_id = db.Column(db.Integer, db.ForeignKey('grocery_store.id'))
    departments = db.relationship('Department', secondary='employee_department', back_populates='employees')

    serialize_rules = ('-departments.employees', '-password_hash') 

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    # Method to verify password
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
        

class Department(db.Model, SerializerMixin):
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    grocery_store_id = db.Column(db.Integer, db.ForeignKey('grocery_store.id'))
    grocery_store = db.relationship('GroceryStore', back_populates='departments')
    employees = db.relationship('Employee', secondary='employee_department', back_populates='departments')

    serialize_rules = ('-employees.departments', '-grocery_store.departments')

employee_department = db.Table('employee_department',
    db.Column('employee_id', db.Integer, db.ForeignKey('employees.id')),
    db.Column('department_id', db.Integer, db.ForeignKey('departments.id'))
) 
