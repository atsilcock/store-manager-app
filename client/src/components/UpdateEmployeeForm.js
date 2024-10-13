import React from 'react';

function UpdateEmployeeForm({ name, role, workHours, storeId, setName, setRole, setWorkHours, setStoreId, handleUpdate, employee }) {
  return (
    <form onSubmit={(event) => handleUpdate(event, employee.id)}>
      <h3>Update Employees</h3>

      <label>Update Name: </label>
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
        onChange={e => setWorkHours(e.target.value)}
      />

      <label>Update Store Id:</label>
      <input 
        type="number" 
        value={storeId} 
        onChange={e => setStoreId(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default UpdateEmployeeForm
