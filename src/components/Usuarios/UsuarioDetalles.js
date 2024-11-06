import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function UsuarioDetalles() {
  const { id } = useParams();  
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`);
      const data = await response.json();
      setUsuario(data);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),  
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      alert('Usuario actualizado exitosamente');
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      alert('Usuario eliminado exitosamente');
      navigate('/usuarios'); 
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Detalles del usuario</h2>
      <Form>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={usuario.nombre || ''}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={usuario.apellido || ''}
            onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formADni">
          <Form.Label>DNI</Form.Label>
          <Form.Control
            type="number"
            value={usuario.dni || ''}
            onChange={(e) => setUsuario({ ...usuario, dni: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={usuario.email || ''}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formRol">
          <Form.Label>Rol</Form.Label>
          <Form.Control
            as="select"
            value={usuario.rol || ''}
            onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
            >
                <option value="alumno">Alumno</option>
                <option value="docente">Docente</option>
                <option value="no docente">No docente</option>
                <option value="otro">Otro</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="formUid">
            <Form.Label>UID</Form.Label>
            <Form.Control
                type="text"
                value={usuario.uid || ''}
                onChange={(e) => setUsuario({ ...usuario, uid: e.target.value })}
            />
        </Form.Group>

        <Button variant="secondary" onClick={handleUpdate}>
          Actualizar
        </Button>

        <Button variant="dark" onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Eliminar
        </Button>

      </Form>
    </div>
  );
}

export default UsuarioDetalles;
