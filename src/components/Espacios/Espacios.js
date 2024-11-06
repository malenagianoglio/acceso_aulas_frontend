import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';

function Espacios() {
    const [espacios, setEspacios] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        fetchEspacios();
      }, []);
    
      const fetchEspacios = async () => {
        const response = await fetch('http://localhost:8080/api/espacios'); 
        const data = await response.json();
        setEspacios(data);
      };

    const espaciosFiltrados = espacios.filter(espacios => 
        espacios.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        espacios.sector.toLowerCase().includes(busqueda.toLowerCase())
    );
    

    return (
      <div className='espacios-container'>
          <div className='espacios-title'>
              <h2>Gestión de espacios</h2>
              <div className='boton-alta'>
                  <Link to="/espacios/nuevo">
                      <Button variant="dark">Nuevo espacio</Button>
                  </Link>
              </div>
          </div>
          <div className='buscador'>
            <Form.Group controlId="busqueda">
            <Form.Control
                type="text"
                placeholder="Buscar espacio por nombre o sector..."
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
                  <th>Sector</th>
                  <th>ID ESP8266</th>
                  <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              {espaciosFiltrados.map((espacio) => (
                  <tr key={espacio.id}>
                  <td>{espacio.id}</td>
                  <td>{espacio.nombre}</td>
                  <td>{espacio.sector}</td>
                  <td>{espacio.id_esp8266}</td>
                  <td>
                  <Link to={`/espacios/${espacio.id}`}>
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
  
  export default Espacios;
  