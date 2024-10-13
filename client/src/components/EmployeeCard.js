import React, {useState} from 'react';

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
      {updateForm && (
        <form onSubmit={(event) => handleUpdate(event, employee.id)}>
            <h3>Update Employees</h3>

            <lable>Update Name: </lable>
            <input 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <label>Update Role: </label>
            <input 
            type="text"
            value={role}
            onChange={e => setRole(e.target.value)}
            />
            
            <label>Update Work Hours:</label>
            
            <input 
            type="number" 
            value={workHours} 
            onChange={(e) => setWorkHours(e.target.value)}  // Capture work hours input
            />

            <label>Update Store Id:</label>
            <input 
            type="number" 
            value={storeId} 
            onChange={(e) => setStoreId(e.target.value)}  // Capture store ID input
            />

            <button type="submit">Submit</button>
        </form>
      )}
      <button>Delete</button>
    </div>
  );
}

export default EmployeeCard;
