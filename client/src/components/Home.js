import React, { useEffect, useState } from "react";

function Home() {
    const [stores, setStores] = useState([])

    

 
    useEffect(() => {
        fetch("http://127.0.0.1:5555/store",)
        .then(response => response.json())
        .then(data => setStores(data))
    },[])

    const storeList = stores.map(store => {
        return <ul key={store.id}> {store.name} Grocery | Store ID: {store.id} | {store.location} </ul>
    })
      
   

    return (
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h1>Grocery Stores</h1>
        {storeList}
        <h2>Creating Employees</h2>
        <li> Navigate to Add Employee </li>
        <li> Fill in the new employee’s details such as name, role, and work hours.</li>
        <li>Assign the employee to the correct grocery store and department.</li>
        <li>Submit to create the new employee profile!</li>
        <h2>Deleteing an Employee</h2>
        <li>Navigate to Employee / Department Info & Select the Employee.</li>
        <li>Click the 'Delete' button next to their name.</li>
        <li>Confirm your choice to permanently remove the employee from the system. You will see a message.</li>
        <h2>Updating an Employee</h2>
        <li> Navigate to Employee / Department Info & Select the Employee.</li>
        <li> Click on "Update" & Fill in the employee’s details such as name, role, and work hours.</li>
        <li>Update the necessary details, like their role or work hours.</li>
        <li>Submit the changes to update their profile!</li>
        <h2>IMPORTANT REMINDERS</h2>
        <li>Submit the proper I-8 form to corporate for verification.</li>
        <li>Submit all I-9 paperwork and tax information for the appropriate state.</li>
        <li>Ensure the training packet is signed and sealed by the new employee.</li>
        <li>Submit the signed Employee Code of Conduct to HR.</li>
        <li>Complete the background check submission as per company policy.</li>

        
      </div>
    )
}



export default Home