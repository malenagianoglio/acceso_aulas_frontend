import React, { useState, useEffect } from 'react';
import { Table, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';

function HistorialAccesos() {
    const [historial, setHistorial] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/historialAcceso');
                setHistorial(response.data);
            } catch (error) {
                console.error('Error fetching historial:', error);
            }
        };

        fetchHistorial();

        const interval = setInterval(fetchHistorial, 10000); 

        return () => clearInterval(interval);
    }, []);

    const filteredHistorial = historial.filter((entry) => {
        const { usuario, espacio } = entry;
        return (
            usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.dni.includes(searchTerm) ||
            espacio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className='historial-accesos'>
            <h2 className='title'>Historial de Accesos</h2>
            <Form.Group controlId="searchHistorial">
                <Form.Label>Buscar Historial (Nombre, Apellido, DNI, Espacio)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Buscar por Nombre, Apellido, DNI o Espacio"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Espacio</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHistorial.map((entry) => {
                        const { historial, usuario, espacio } = entry;
                        const entrada = historial.entrada ? new Date(historial.entrada).toLocaleString() : 'N/A';
                        const salida = historial.salida ? new Date(historial.salida).toLocaleString() : 'N/A';
                        const estadoAbierto = !historial.salida; 

                        return (
                            <tr key={historial.id}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.dni}</td>
                                <td>{espacio.nombre}</td>
                                <td>{entrada}</td>
                                <td>{salida}</td>
                                <td>
                                    <Badge bg={estadoAbierto ? 'success' : 'danger'}>
                                        {estadoAbierto ? 'Abierto' : 'Cerrado'}
                                    </Badge>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default HistorialAccesos;
