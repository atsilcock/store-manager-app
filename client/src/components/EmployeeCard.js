import React from 'react';

function EmployeeCard({ employee }) {
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Employee Details</h3>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Work Hours:</strong> {employee.work_hours}</p>
      <p><strong>Grocery Store:</strong> {employee.grocery_store_id}</p>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default EmployeeCard;
