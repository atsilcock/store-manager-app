import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import HomePage from './Home'
import About from "./About"
import New_Employee from './New_Employee'


function App() {
  const [employees, setEmployees] = useState([])
    console.log(employees)
  
  
    useEffect(() => {
      fetch("http://127.0.0.1:5555/employees")
        .then(response => response.json())
        .then(data => setEmployees(data));
    }, [])

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage employees = {employees} />} />
        <Route path="/about" element={<About />} />
        <Route path="/New_Employee" element={<New_Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
