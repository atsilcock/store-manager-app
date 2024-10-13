import React, {useState} from 'react';

function EmployeeCard({ employee, employees, setEmployees }) {
    const [employeebyid, setemployeebyid] = ([])
    const [updateForm, setUpdateForm] = useState(false)
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [workHours, setWorkHours] = useState("")
    const [storeId, setStoreId] = useState("")

const handleUpdate = (id) => {
    fetch(`http://127.0.0.1:5555/${id}`, {
        method: "PATCH", 
        body:JSON.stringify({
            role: role,
            name: name,
            work_hours: workHours,
            grocery_store_id: storeId
        }), 
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => setemployeebyid([...employees, data]))
}

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
      <button>Delete</button>
    </div>
  );
}

export default EmployeeCard;
