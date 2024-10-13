import React, {useState, useEffect} from 'react';
import UpdateEmployeeForm from "./UpdateEmployeeForm"

function EmployeeCard({ selectedEmployee, employees, setEmployees }) {
    const [updateForm, setUpdateForm] = useState(false)
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [workHours, setWorkHours] = useState("")
    const [storeId, setStoreId] = useState("")


    const handleUpdate = (event, id) => {
        event.preventDefault();  // Prevent default form submission behavior
        fetch(`http://127.0.0.1:5555/employees/${id}`, {
          method: "PATCH", 
          body: JSON.stringify({
            role: role || selectedEmployee.role,  // Use existing values if not updated
            name: name || selectedEmployee.name,
            work_hours: workHours || selectedEmployee.work_hours,
            grocery_store_id: storeId || selectedEmployee.grocery_store_id
          }), 
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(data => {
          const updatedEmployees = employees.map(emp => 
            emp.id === id ? data : emp
          )
          setEmployees(updatedEmployees)
          setUpdateForm(false)
        });

        setName("")
        setWorkHours("")
        setRole("")
        setStoreId("")
      };

    const handleUpdateClick = (event) => {
        event.preventDefault()
        setUpdateForm(!updateForm)
    }

    const handleDelete = (event, id) => {
        fetch(`http://127.0.0.1:5555/employees/${id}`, {
            method: "Delete",
          })
          .then((response) => {
            if (response.ok) {
                const updatedEmployees = employees.filter(employee => employee.id !== id)
                setEmployees(updatedEmployees)
            }
          })
    }

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Employee Details</h3>
      <p><strong>Name:</strong> {selectedEmployee.name}</p>
      <p><strong>Role:</strong> {selectedEmployee.role}</p>
      <p><strong>Work Hours:</strong> {selectedEmployee.work_hours}</p>
      <p><strong>Grocery Store:</strong> {selectedEmployee.grocery_store_id}</p>
      <button onClick = {handleUpdateClick}>Update</button>
      {updateForm && ( 
        <UpdateEmployeeForm
       name={name}
       role={role}
       workHours={workHours}
       storeId={storeId}
       setName={setName}
       setRole={setRole}
       setWorkHours={setWorkHours}
       setStoreId={setStoreId}
       handleUpdate={handleUpdate}
       employee={selectedEmployee}
      />
      )}
      <button onClick={(event) => handleDelete(event, selectedEmployee.id)}>Delete</button>
    </div>
  );
}

export default EmployeeCard;
