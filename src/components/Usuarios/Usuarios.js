// Usuarios.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const response = await fetch('http://localhost:8080/api/usuarios'); 
    const data = await response.json();
    setUsuarios(data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'DELETE',
      });
    
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario: ' + response.statusText);
      }

      const updatedUsuarios = usuarios.filter((user) => user.id !== id);
      setUsuarios(updatedUsuarios);
    } catch (error) {
      console.error('Error en handleDelete:', error);
    }
  };
  

  return (
    <div className='usuario-container'>
        <div className='usuario-title'>
            <h2>Gestión de usuarios</h2>
            <div className='boton-alta'>
                <Link to="/usuarios/nuevo">
                    <Button variant="outline-success">Nuevo usuario</Button>
                </Link>
            </div>
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
            {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.uid}</td>
                <td>
                    <Button variant="warning">Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(usuario.id)}>Eliminar</Button>
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
