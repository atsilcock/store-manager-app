import React, {useState, useEffect} from 'react';
import UpdateEmployeeForm from "./UpdateEmployeeForm"

function EmployeeCard({ employee, employees, setEmployees }) {
    const [employeebyid, setemployeebyid] = ([])
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
            role: role || employee.role,  // Use existing values if not updated
            name: name || employee.name,
            work_hours: workHours || `{employee.work_hours} hours`,
            grocery_store_id: storeId || employee.grocery_store_id
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



  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Employee Details</h3>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Work Hours:</strong> {employee.work_hours}</p>
      <p><strong>Grocery Store:</strong> {employee.grocery_store_id}</p>
      <button onClick = {handleUpdateClick}>Update</button>
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
       employee={employee}
      />
      <button>Delete</button>
    </div>
  );
}

export default EmployeeCard;
