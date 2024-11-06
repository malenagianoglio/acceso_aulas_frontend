import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const response = await fetch('http://localhost:8080/api/usuarios'); 
    const data = await response.json();
    setUsuarios(data);
  };

  const usuariosFiltrados = usuarios.filter(usuario => {
    const busquedaLower = busqueda.toLowerCase();
    const partesBusqueda = busquedaLower.split(' ');
  
    return partesBusqueda.every(parte =>
      usuario.nombre.toLowerCase().includes(parte) || 
      usuario.apellido.toLowerCase().includes(parte)
    );
  });

  return (
    <div className='usuario-container'>
      <div className='usuario-title'>
        <h2>Gestión de usuarios</h2>
        <div className='boton-alta'>
          <Link to="/usuarios/nuevo">
            <Button variant="dark">Nuevo usuario</Button>
          </Link>
        </div>
      </div>
      <div className='buscador'>
        <Form.Group controlId="busqueda">
          <Form.Control
            type="text"
            placeholder="Buscar usuario por nombre y apellido..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="mb-3"
          />
        </Form.Group>
      </div>
      <div className='tabla'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>UID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.uid}</td>
                <td>
                  <Link to={`/usuarios/${usuario.id}`}>
                    <Button variant="outline-secondary">Ver</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Usuarios;
