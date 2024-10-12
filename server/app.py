#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
from models import db, GroceryStore, Employee, Department


# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Employees(Resource):
    def get(self):
        employees = [employee.to_dict() for employee in Employee.query.all()]
        if not employees:
            response = {"message":"employees do not exist"}
            return make_response(jsonify(response), 401)
        else:
            return make_response(jsonify(employees), 200)
        
    def post(self):
        data = request.get_json()

        new_employee = Employee(
                    name = data.get("name"),
                    role = data.get("role"),
                    work_hours = data.get("work_hours"),
                    grocery_store_id = data.get("grocery_store_id")  
                )
        db.session.add(new_employee)
        db.session.commit()

        return make_response(jsonify(new_employee.to_dict(), 201))

        
api.add_resource(Employees, "/employees")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

