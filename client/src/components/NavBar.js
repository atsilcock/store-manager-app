import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: 'tan', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
      <Link to="/about" style={{ margin: '0 10px' }}>Employee / Department Info</Link>
      <Link to="/give" style={{ margin: '0 10px' }}>Add Employee</Link>
    </nav>
  );
}

export default NavBar;
