import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function EspacioDetalles() {
  const { id } = useParams();  
  const [espacio, setEspacio] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEspacio();
  }, []);

  const fetchEspacio = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/espacios/${id}`);
      const data = await response.json();
      setEspacio(data);
    } catch (error) {
      console.error('Error al obtener el espacio:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/espacios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(espacio),  
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el espacio');
      }

      alert('Espacio actualizado exitosamente');
      navigate('/espacios');
    } catch (error) {
      console.error('Error al actualizar el espacio:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/espacios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el espacio');
      }

      alert('Espacio eliminado exitosamente');
      navigate('/espacios'); 
    } catch (error) {
      console.error('Error al eliminar el espacio:', error);
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
            value={espacio.nombre || ''}
            onChange={(e) => setEspacio({ ...espacio, nombre: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formSector">
          <Form.Label>Sector</Form.Label>
          <Form.Control
            as="select"
            value={espacio.sector || ''}
            onChange={(e) => setEspacio({ ...espacio, sector: e.target.value })}
            >
                <option value="primer nivel">Primer nivel</option>
                <option value="segundo nivel">Segundo nivel</option>
                <option value="tercer nivel">Tercer nivel</option>
                <option value="cuarto nivel">Cuarto nivel</option>
                <option value="laboratorio">Laboratorio</option>
                <option value="biblioteca">Biblioteca</option>
                <option value="cantina">Cantina</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="formIdEsp8266">
          <Form.Label>ID ESP8266</Form.Label>
          <Form.Control
            type="text"
            value={espacio.id_esp8266 || ''}
            onChange={(e) => setEspacio({ ...espacio, id_esp8266: e.target.value })}
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

export default EspacioDetalles;
