import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

function Espacios() {
    const [espacios, setEspacios] = useState([]);

    useEffect(() => {
        fetchEspacios();
      }, []);
    
      const fetchEspacios = async () => {
        const response = await fetch('http://localhost:8080/api/espacios'); 
        const data = await response.json();
        setEspacios(data);
      };

    return (
      <div className='espacios-container'>
          <div className='espacios-title'>
              <h2>Gestión de espacios</h2>
              <div className='boton-alta'>
                  <Link to="/espacios/nuevo">
                      <Button variant="outline-success">Nuevo espacio</Button>
                  </Link>
              </div>
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
              {espacios.map((espacio) => (
                  <tr key={espacio.id}>
                  <td>{espacio.id}</td>
                  <td>{espacio.nombre}</td>
                  <td>{espacio.sector}</td>
                  <td>{espacio.id_esp8266}</td>
                  <td>
                  <Link to={`/espacios/${espacio.id}`}>
                      <Button variant="outline-success">Ver</Button>
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
  