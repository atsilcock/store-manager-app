import React, { useState } from 'react';
import { useFormik, Formik, Field } from 'formik';
import EmployeeCard from './EmployeeCard';

function About({ employees, setEmployees }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeSelection = (employeeId) => {
    const selected = employees.find(employee => employee.id === parseInt(employeeId));
    setSelectedEmployee(selected)
  };

  const formik = useFormik ({
    initialValues: {
        employeeId: ''
    },
    onSubmit: (values) => {
        handleEmployeeSelection(values.employeeId)
    }
  })


  return (
    <div>
      <h1>Manage Employees</h1>
      <h3>Select Employee</h3>
      
      <form onSubmit={formik.handleSubmit}>
        <label>Employees: </label>
        <select
          name="employeeId"
          value={formik.values.employeeId}
          onChange={(e) => {
            formik.handleChange(e)
            handleEmployeeSelection(e.target.value)
          }}
        >
          <option>Select an employee</option>
          {employees
          .sort((a,b) => a.grocery_store_id - b.grocery_store_id)
          .map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name} | {employee.role} | Store ID: {employee.grocery_store_id}
            </option>
          ))}
        </select>
    </form>
      {selectedEmployee && <EmployeeCard selectedEmployee={selectedEmployee} employees = {employees} setEmployees = {setEmployees} />}
    </div>
  )
}

export default About;
