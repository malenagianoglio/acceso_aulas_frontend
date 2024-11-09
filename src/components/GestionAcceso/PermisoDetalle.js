import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, ListGroup } from 'react-bootstrap';

function PermisoDetalle() {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [permiso, setPermiso] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [espacios, setEspacios] = useState([]);
  const [searchUsuario, setSearchUsuario] = useState('');
  const [searchEspacio, setSearchEspacio] = useState('');
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [filteredEspacios, setFilteredEspacios] = useState([]);
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    fetchPermiso();
    fetchUsuarios();
    fetchEspacios();
  }, []);

  const fetchPermiso = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/permisoAcceso/${id}`);
      const data = await response.json();
      setPermiso(data);
      setSearchUsuario(`${data.usuario.nombre} ${data.usuario.apellido}`);
      setSearchEspacio(data.espacio.nombre);
      setFechaFin(data.fechaFin || '');
    } catch (error) {
      console.error('Error al obtener el permiso:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const fetchEspacios = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/espacios`);
      const data = await response.json();
      setEspacios(data);
    } catch (error) {
      console.error('Error al obtener espacios:', error);
    }
  };

  useEffect(() => {
    setFilteredUsuarios(
      searchUsuario
        ? usuarios.filter(usuario =>
            (usuario.nombre && usuario.nombre.toLowerCase().includes(searchUsuario.toLowerCase())) ||
            (usuario.apellido && usuario.apellido.toLowerCase().includes(searchUsuario.toLowerCase()))
          )
        : []
    );
  }, [searchUsuario, usuarios]);

  useEffect(() => {
    setFilteredEspacios(
      searchEspacio
        ? espacios.filter(espacio =>
            espacio.nombre && espacio.nombre.toLowerCase().includes(searchEspacio.toLowerCase())
          )
        : []
    );
  }, [searchEspacio, espacios]);

  const handleUpdate = async () => {
    try {
      const updatedPermiso = {
        ...permiso,
        fechaFin,
        idUsuario: permiso.usuario.id,  
        idEspacio: permiso.espacio.id, 
      };

      const response = await fetch(`http://localhost:8080/api/permisoAcceso/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPermiso),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el permiso');
      }

      alert('Permiso actualizado exitosamente');
      navigate('/gestionAcceso');
    } catch (error) {
      console.error('Error al actualizar el permiso:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/permisoAcceso/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el permiso');
      }

      alert('Permiso eliminado exitosamente');
      navigate('/gestionAcceso'); 
    } catch (error) {
      console.error('Error al eliminar el permiso:', error);
    }
  };

  return (
    <div>
      <h2>Detalles del permiso</h2>
      <Form>
        <Form.Group controlId="usuario">
          <Form.Label>Buscar Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre o Apellido"
            value={searchUsuario}
            onChange={(e) => setSearchUsuario(e.target.value)}
          />
          {filteredUsuarios.length > 0 && (
            <ListGroup>
              {filteredUsuarios.map((usuario) => (
                <ListGroup.Item
                  key={usuario.id}
                  action
                  onClick={() => {
                    setPermiso((prev) => ({ ...prev, usuario }));
                    setSearchUsuario(`${usuario.nombre} ${usuario.apellido}`);
                    setFilteredUsuarios([]);
                  }}
                >
                  {usuario.nombre} {usuario.apellido}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>

        <Form.Group controlId="espacio">
          <Form.Label>Buscar Espacio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del espacio"
            value={searchEspacio}
            onChange={(e) => setSearchEspacio(e.target.value)}
          />
          {filteredEspacios.length > 0 && (
            <ListGroup>
              {filteredEspacios.map((espacio) => (
                <ListGroup.Item
                  key={espacio.id}
                  action
                  onClick={() => {
                    setPermiso((prev) => ({ ...prev, espacio }));
                    setSearchEspacio(espacio.nombre);
                    setFilteredEspacios([]);
                  }}
                >
                  {espacio.nombre}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>

        <Form.Group controlId="fechaFin">
          <Form.Label>Fecha de Fin (opcional)</Form.Label>
          <Form.Control
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
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

export default PermisoDetalle;
