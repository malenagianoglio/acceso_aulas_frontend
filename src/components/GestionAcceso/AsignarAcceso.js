import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Table } from 'react-bootstrap';
import axios from 'axios';

const AsignarEspacio = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [espacios, setEspacios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
    const [searchUsuario, setSearchUsuario] = useState('');
    const [searchEspacio, setSearchEspacio] = useState('');
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [filteredEspacios, setFilteredEspacios] = useState([]);
    const [fechaFin, setFechaFin] = useState(''); // Estado para la fecha de fin

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usuariosResponse, espaciosResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/usuarios'),
                    axios.get('http://localhost:8080/api/espacios')
                ]);
                setUsuarios(usuariosResponse.data);
                setEspacios(espaciosResponse.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterUsuarios = () => {
            if (searchUsuario) {
                return usuarios.filter(usuario =>
                    usuario.nombre.toLowerCase().includes(searchUsuario.toLowerCase()) ||
                    usuario.apellido.toLowerCase().includes(searchUsuario.toLowerCase()) ||
                    usuario.dni.toString().includes(searchUsuario)
                );
            }
            return [];
        };
        setFilteredUsuarios(filterUsuarios());
    }, [searchUsuario, usuarios]);

    useEffect(() => {
        const filterEspacios = () => {
            if (searchEspacio) {
                return espacios.filter(espacio =>
                    espacio.nombre.toLowerCase().includes(searchEspacio.toLowerCase())
                );
            }
            return [];
        };
        setFilteredEspacios(filterEspacios());
    }, [searchEspacio, espacios]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/permisoAcceso', {
                usuarioId: usuarioSeleccionado.id,
                espacioId: espacioSeleccionado.id,
                fecha_inicio: new Date(),
                fecha_fin: fechaFin || null // Añade la fecha de fin si se proporciona
            });
            alert('Espacio asignado exitosamente');
            resetForm();
        } catch (error) {
            console.error('Error al asignar espacio:', error);
        }
    };

    const resetForm = () => {
        setUsuarioSeleccionado(null);
        setEspacioSeleccionado(null);
        setSearchUsuario('');
        setSearchEspacio('');
        setFechaFin(''); // Resetea la fecha de fin
        setFilteredUsuarios([]);
        setFilteredEspacios([]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Otros campos */}
            <Form.Group controlId="formUsuario">
                <Form.Label>Buscar Usuario (Nombre, Apellido o DNI)</Form.Label>
                <Form.Control
                    type="text"
                    value={searchUsuario}
                    onChange={(e) => setSearchUsuario(e.target.value)}
                    placeholder="Buscar usuario por nombre, apellido o DNI"
                />
                {filteredUsuarios.length > 0 && (
                    <ListGroup>
                        {filteredUsuarios.map(usuario => (
                            <ListGroup.Item
                                key={usuario.id}
                                onClick={() => {
                                    setUsuarioSeleccionado(usuario);
                                    setSearchUsuario(`${usuario.nombre} ${usuario.apellido}`);
                                    setFilteredUsuarios([]); // Ocultar lista
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {usuario.nombre} {usuario.apellido} - DNI: {usuario.dni}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                {usuarioSeleccionado && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>DNI</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{usuarioSeleccionado.id}</td>
                                <td>{usuarioSeleccionado.nombre}</td>
                                <td>{usuarioSeleccionado.apellido}</td>
                                <td>{usuarioSeleccionado.dni}</td>
                                <td>{usuarioSeleccionado.email}</td>
                                <td>{usuarioSeleccionado.rol}</td>
                            </tr>
                        </tbody>
                    </Table>
                )}
            </Form.Group>

            <Form.Group controlId="formEspacio">
                <Form.Label>Buscar Espacio</Form.Label>
                <Form.Control
                    type="text"
                    value={searchEspacio}
                    onChange={(e) => setSearchEspacio(e.target.value)}
                    placeholder="Buscar espacio por nombre"
                />
                {filteredEspacios.length > 0 && (
                    <ListGroup>
                        {filteredEspacios.map(espacio => (
                            <ListGroup.Item
                                key={espacio.id}
                                onClick={() => {
                                    setEspacioSeleccionado(espacio);
                                    setSearchEspacio(espacio.nombre);
                                    setFilteredEspacios([]); // Ocultar lista
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {espacio.nombre}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                {espacioSeleccionado && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Sector</th>
                                <th>ID ESP8266</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{espacioSeleccionado.id}</td>
                                <td>{espacioSeleccionado.nombre}</td>
                                <td>{espacioSeleccionado.sector}</td>
                                <td>{espacioSeleccionado.id_esp8266}</td>
                            </tr>
                        </tbody>
                    </Table>
                )}
            </Form.Group>

            <Form.Group controlId="formFechaFin">
                <Form.Label>Fecha Límite de Asignación (Opcional)</Form.Label>
                <Form.Control
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!usuarioSeleccionado || !espacioSeleccionado}>
                Asignar Espacio
            </Button>
        </Form>
    );
};

export default AsignarEspacio;
