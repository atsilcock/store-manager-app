import React from 'react';
import { Formik, Form, Field } from 'formik';
import {useNavigate} from 'react-router-dom'

function New_Employee({ employees, setEmployees }) {
  const navigate = useNavigate()
  
  const new_employee = (values, { resetForm }) => {
    fetch("http://127.0.0.1:5555/employees", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
        role: values.role,
        work_hours: values.workHours,
        grocery_store_id: values.storeId,
        hours_worked: values.hoursWorked,
        employee_start_date: values.startDate
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("New Employee Data", data)
      setEmployees([...employees, data])
      console.log([employees, data])
      navigate("/about")
      resetForm()
    });
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <Formik
        initialValues={{
          name: '',
          role: '',
          workHours: '',
          storeId: '',
          hoursWorked: "",
          startDate: ""
        }}
        onSubmit={new_employee}
      >
        {({ values,handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Name: </label>
              <Field
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Role: </label>
              <Field
                type="text"
                name="role"
                value={values.role}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Work Hours: </label>
              <Field
                type="number"
                name="workHours"
                value={values.workHours}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Store ID: </label>
              <Field
                type="number"
                name="storeId"
                value={values.storeId}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Hours Worked: </label>
              <Field
                type="number"
                name="hoursWorked"
                value={values.hoursWorked}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Start Date: </label>
              <Field
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Add Employee</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default New_Employee
