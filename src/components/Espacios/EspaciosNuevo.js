import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EspacioAlta = () => {
    const [nombre, setNombre] = useState('');
    const [sector, setSector] = useState('primer nivel');
    const [id_esp8266, setId_esp8266] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/espacios', {
                nombre,
                sector,
                id_esp8266,
            });
            alert('Espacio agregado exitosamente');
            navigate('/espacios');
        } catch (error) {
            console.error('Error al agregar espacio:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre del espacio"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formSector">
                <Form.Label>Sector</Form.Label>
                <Form.Control
                    as="select"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    required
                >
                    <option value="">Seleccione un sector</option>
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
                    value={id_esp8266}
                    onChange={(e) => setId_esp8266(e.target.value)}
                    placeholder="Ingrese el ID del ESP8266"
                    required
                />
            </Form.Group>
            <Button variant="dark" type="submit">
                Agregar Espacio
            </Button>
        </Form>
    );
};

export default EspacioAlta;
