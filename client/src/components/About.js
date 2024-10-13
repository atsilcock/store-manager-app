import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import EmployeeCard from './EmployeeCard';

function About({ employees }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);



  const selectedEmployee = employees.find(employee => employee.id === parseInt(selectedEmployeeId));

  return (
    <div>
      <h1>Manage Employees</h1>
      <h3>Select Employees or Departments</h3>

      <Formik
        initialVulues = {selectedEmployee}

      {selectedEmployee && <EmployeeCard employee={selectedEmployee} />}
    </div>
  );
}

export default About;
