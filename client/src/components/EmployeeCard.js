import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'

function EmployeeCard({ selectedEmployee, employees, setEmployees }) {
  const [updateForm, setUpdateForm] = useState(false);
  const [message, setMessage] = useState('')

  const handleUpdate = (values, { resetForm }) => {
    fetch(`http://127.0.0.1:5555/employees/${selectedEmployee.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        role: values.role || selectedEmployee.role,
        name: values.name || selectedEmployee.name,
        work_hours: values.workHours || selectedEmployee.work_hours,
        grocery_store_id: values.storeId || selectedEmployee.grocery_store_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedEmployees = employees.map((emp) =>
          emp.id === selectedEmployee.id ? data : emp
        );
        setEmployees(updatedEmployees)
        resetForm();
        setUpdateForm(false);
        setMessage(`${selectedEmployee.name} has been updated (select another employee to update)`)
        setTimeout(() => {
          setMessage('')
          window.location.reload()
        }, 3000)
      });
  };

  const handleUpdateClick = (event) => {
    event.preventDefault()
    setUpdateForm(!updateForm)
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5555/employees/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        const updatedEmployees = employees.filter((employee) => employee.id !== id)
        setEmployees(updatedEmployees)
        setMessage(`${selectedEmployee.name} has been deleted`)
      setTimeout(() => {
        setMessage('')
        window.location.reload()
      }, 3000)
      }
    });
  };

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Employee Details</h3>
      <p><strong>Name:</strong> {selectedEmployee.name}</p>
      <p><strong>Role:</strong> {selectedEmployee.role}</p>
      <p><strong>Work Hours:</strong> {selectedEmployee.work_hours}</p>
      <p><strong>Grocery Store:</strong> {selectedEmployee.grocery_store_id}</p>

      <button onClick={handleUpdateClick}>Update</button>

      {updateForm && (
        <Formik
          initialValues={{
            name: "",
            role: "",
            workHours: "",
            storeId: "",
          }}
          onSubmit={handleUpdate}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <h4>ONLY UPDATE WHAT IS NEEDED</h4>
              <div>
                <label>Name: </label>
                <Field type="text" name="name" />
              </div>

              <div>
                <label>Role: </label>
                <Field type="text" name="role" />
              </div>

              <div>
                <label>Work Hours: </label>
                <Field type="number" name="workHours" />
              </div>

              <div>
                <label>Store ID: </label>
                <Field type="number" name="storeId" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      )}

      <button onClick={() => handleDelete(selectedEmployee.id)}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EmployeeCard;
