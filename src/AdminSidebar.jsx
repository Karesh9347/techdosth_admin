import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './adminSidebar.css';

const AdminSidebar = () => {
  return (
    <Nav className="flex-column admin-sidebar">
      <Nav.Link as={Link} to="/add-question" className="nav-link">Add DSA Question</Nav.Link>
      <Nav.Link as={Link}  to="/add-contest" className="nav-link">Add Contest</Nav.Link>
      <Nav.Link as={Link}  to="/add-aptitude" className="nav-link">Add Aptitude Question</Nav.Link>
    </Nav>
  );
};

export default AdminSidebar;
