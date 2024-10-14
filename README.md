Grocery Store Management API
# Management System

This project provides a RESTful API for managing employees, grocery stores, and departments. The API allows CRUD operations for employees and stores, while maintaining relationships between departments and employees within the store.

## Technologies Used
- **Python 3.8.13**
- **Flask**: A lightweight WSGI web application framework
- **Flask-SQLAlchemy**: A SQL toolkit for Python
- **Flask-RESTful**: An extension for Flask that adds support for quickly building REST APIs
- **Flask-Migrate**: A SQLAlchemy database migration framework
- **Flask-CORS**: A Flask extension for handling Cross-Origin Resource Sharing (CORS)
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM)
- **Faker**: A library for generating fake data
- **Alembic**: A lightweight database migration tool for SQLAlchemy
- **IPDB**: Python debugger

## Project Setup

### Installation

Clone this repository:
```bash
git clone <repository-url>
cd <repository-name>
```

Create a virtual environment and activate it:
```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:
```bash
pip install -r requirements.txt
```

Initialize the database and run migrations:
```bash
flask db upgrade
```

To seed the database with sample data, run:
```bash
python seed.py
```

### Running the Server

To start the server, run the following command:
```bash
python app.py
```
By default, the server will be hosted on [http://localhost:5555](http://localhost:5555).

## API Endpoints

### Employees
- **GET /employees**: Retrieve a list of all employees.
- **POST /employees**: Add a new employee by providing their name, role, work_hours, and grocery_store_id.
- **GET /employees/<int:id>**: Retrieve details of a specific employee by their id.
- **PATCH /employees/<int:id>**: Update details of an employee, such as name, role, or work_hours.
- **DELETE /employees/<int:id>**: Delete an employee by their id.

### Grocery Stores
- **GET /store**: Retrieve a list of all grocery stores.
- **GET /store/<int:id>**: Retrieve details of a specific store by its id.

## Database Structure

### Models

#### GroceryStore
- **id**: Primary key
- **name**: Name of the store
- **location**: Location of the store
- **Relationships**: A grocery store has many departments and employees through departments

#### Employee
- **id**: Primary key
- **name**: Employee's name
- **role**: Role in the store (e.g., Cashier, Manager)
- **work_hours**: Number of work hours assigned
- **grocery_store_id**: Foreign key to the GroceryStore
- **Relationships**: Many-to-many relationship with Department

#### Department
- **id**: Primary key
- **name**: Name of the department (e.g., Produce, Deli)
- **grocery_store_id**: Foreign key to the GroceryStore
- **Relationships**: A department belongs to a grocery store and has many employees

## Database Seeding

To populate the database with sample stores, departments, and employees, run the seeding script:
```bash
python seed.py
```
This will create:
- 4 grocery stores
- Departments in each store (e.g., Bakery, Produce, Dairy, Deli, Meat)
- 100 employees with randomly assigned roles and departments.

## Migrations

This project uses Alembic for database migrations. To make and apply migrations:

To generate a new migration:
```bash
flask db migrate -m "Migration message"
```

To apply the migration:
```bash
flask db upgrade
```
