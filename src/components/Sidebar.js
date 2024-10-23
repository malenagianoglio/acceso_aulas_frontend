import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar bg="dark" className="flex-column custom-nav" variant="dark">
        <Navbar.Brand href="../App.js">SISTEMA ACCESO</Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/usuarios"><i class="bi bi-person-fill icon"></i>Usuarios</Nav.Link>
          <Nav.Link as={Link} to="/espacios"><i class="bi bi-box icon"></i>Espacios</Nav.Link>
          <Nav.Link as={Link} to="/gestionAcceso"><i class="bi bi-arrow-down-up icon"></i>Gestión de accesos</Nav.Link>
          <Nav.Link as={Link} to="/historialAcceso"><i class="bi bi-journal-text icon"></i>Historial de accesos</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Sidebar;
