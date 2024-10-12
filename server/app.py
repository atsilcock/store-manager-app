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
    

class EmployeesById(Resource):
    def get(self, id):
        employee = Employee.query.filter_by(id = id).first()
        if not employee:
            response = {"message": "No employee has been found"}
            return make_response(jsonify(response), 404)
        else:
            return make_response(jsonify(employee.to_dict()), 200)
        
    def patch(self, id):
        data = request.get_json()
        employee = Employee.query.filter_by(id = id).first()
        if not employee:
            response = {"message": "No employee has been found"}
            return make_response(jsonify(response), 404)
        else:
            for key in ["name", "role", "work_hours"]:
                if key in data:
                    setattr(employee, key, data[key])
        db.session.commit()
        return make_response(jsonify(employee.to_dict()), 200)
        
    def delete(self, id):
        employee = Employee.query.filter_by(id = id).first()
        if not employee:
            response = {"message": "No employee has been found"}
            return make_response(jsonify(response), 404)
        else:
            db.session.delete(employee)
            db.session.commit()
            return make_response(jsonify({}), 204)

class Store(Resource):
    def get(self):
        grocery_stores = [store.to_dict() for store in GroceryStore.query.all()]
        if not grocery_stores:
            response = {"message":"store does not exist"}
            return make_response(jsonify(response), 401)
        else:
            return make_response(jsonify(grocery_stores), 200)
    

class StoreByID(Resource):
    def get(self, id):
        grocery_store = GroceryStore.query.filter_by(id=id).first()
        if not grocery_store:
            response = {"message":"store does not exist"}
            return make_response(jsonify(response), 401)
        else:
            return make_response(jsonify(grocery_store.to_dict()), 200)


api.add_resource(Store, "/store")
api.add_resource(StoreByID,"/store/<int:id>")
api.add_resource(EmployeesById, "/employees/<int:id>")        
api.add_resource(Employees, "/employees")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

