import React, { useState } from 'react';
import { useForMik, Formik, Field } from 'formik';
import EmployeeCard from './EmployeeCard';

function About({ employees }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEmployeeSelection = (employeeId) => {
    const selected = employees.find(employee => employee.id === parseInt(employeeId));
    setSelectedEmployee(selected)
  };

  const formik = useForMik ({
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
      <h3>Select Employees or Departments</h3>

        <form onSubmit={formik.handleSubmit}>
        <label>Employees: </label>
        <select
          name="employeeId"
          value={formik.values.employeeId}
          onChange={(e) => {
            formik.handleChange(e); // Let Formik handle form state
            handleEmployeeSelection(e.target.value); // Handle employee selection logic
          }}
        >
          <option value="" disabled>Select an employee</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name} | {employee.role}
            </option>
          ))}
        </select>
      </form>
    
      {selectedEmployee && <EmployeeCard employee={selectedEmployee} />}
    </div>
  );
}

export default About;
