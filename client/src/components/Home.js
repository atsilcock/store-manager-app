import React, { useEffect, useState } from "react";

function Home({ employees }) {
 
      
    return (
      <div>
        
        <h1>Project</h1>
        <label>Employees: </label>
        <select>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name} | {employee.role}
            </option>
          ))}
        </select>
      </div>
    );
}




export default Home