import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Table } from 'react-bootstrap';
import axios from 'axios';

const AsignarEspacio = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [espacios, setEspacios] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
    const [searchUsuario, setSearchUsuario] = useState('');
    const [searchEspacio, setSearchEspacio] = useState('');
    const [searchPermiso, setSearchPermiso] = useState('');
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [filteredEspacios, setFilteredEspacios] = useState([]);
    const [filteredPermisos, setFilteredPermisos] = useState([]);
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usuariosResponse, espaciosResponse, permisosResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/usuarios'),
                    axios.get('http://localhost:8080/api/espacios'),
                    axios.get('http://localhost:8080/api/permisoAcceso'),
                ]);
                setUsuarios(usuariosResponse.data);
                setEspacios(espaciosResponse.data);
                setPermisos(permisosResponse.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setFilteredUsuarios(
            searchUsuario
                ? usuarios.filter(usuario =>
                    usuario.nombre.toLowerCase().includes(searchUsuario.toLowerCase()) ||
                    usuario.apellido.toLowerCase().includes(searchUsuario.toLowerCase()) ||
                    usuario.dni.toString().includes(searchUsuario)
                )
                : []
        );
    }, [searchUsuario, usuarios]);

    useEffect(() => {
        setFilteredEspacios(
            searchEspacio
                ? espacios.filter(espacio =>
                    espacio.nombre.toLowerCase().includes(searchEspacio.toLowerCase())
                )
                : []
        );
    }, [searchEspacio, espacios]);

    useEffect(() => {
        setFilteredPermisos(
            searchPermiso
                ? permisos.filter(permiso => {
                    const [searchName, searchLastName] = searchPermiso.toLowerCase().split(" ");
    
                    const matchName = permiso.usuario.nombre.toString().toLowerCase().includes(searchName);
                    const matchLastName = searchLastName
                        ? permiso.usuario.apellido.toString().toLowerCase().includes(searchLastName)
                        : true; 
    
                    const matchDni = permiso.usuario.dni.toString().includes(searchPermiso);
                    const matchSpaceName = permiso.espacio.nombre.toString().toLowerCase().includes(searchPermiso.toLowerCase());
    
                    return (matchName && matchLastName) || matchDni || matchSpaceName;
                })
                : permisos
        );
    }, [searchPermiso, permisos]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/permisoAcceso', {
                usuarioId: usuarioSeleccionado.id,
                espacioId: espacioSeleccionado.id,
                fecha_inicio: new Date(),
                fecha_fin: fechaFin || null
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
        setFechaFin('');
        setFilteredUsuarios([]);
        setFilteredEspacios([]);
    };

    return (
        <div className='acceso-container'>
            <div className='acceso-title'>
                <h2>Gestión de accesos</h2>
            </div>
            <div className='acceso-subtitle'>
                <h2>Asignación de espacios</h2>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="usuario">
                    <Form.Label>Buscar Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre, Apellido o DNI"
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
                                        setUsuarioSeleccionado(usuario);
                                        setSearchUsuario(`${usuario.nombre} ${usuario.apellido}`);
                                        setFilteredUsuarios([]);
                                    }}
                                >
                                    {usuario.nombre} {usuario.apellido} - DNI: {usuario.dni}
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
                                        setEspacioSeleccionado(espacio);
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
                <Button type="submit" variant="primary">
                    Asignar Espacio
                </Button>
            </Form>

            <div className='gestion-permisos'>
                <h3>Gestión de Permisos de Acceso</h3>
                <Form.Group controlId="searchPermiso">
                    <Form.Label>Buscar Permiso (ID de Usuario o Espacio)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por ID de Usuario o Espacio"
                        value={searchPermiso}
                        onChange={(e) => setSearchPermiso(e.target.value)}
                    />
                </Form.Group>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Rol</th>
                            <th>Espacio</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPermisos.map((permiso) => {
                            const fechaInicio = permiso.permiso.fecha_inicio ? new Date(permiso.permiso.fecha_inicio).toISOString().split('T')[0] : 'N/A';
                            const fechaFin = permiso.permiso.fecha_fin ? new Date(permiso.permiso.fecha_fin).toISOString().split('T')[0] : 'N/A';

                            return (
                                <tr key={permiso.permiso.id}>
                                    <td>{permiso.usuario.nombre}</td>
                                    <td>{permiso.usuario.apellido}</td>
                                    <td>{permiso.usuario.dni}</td>
                                    <td>{permiso.usuario.rol}</td>
                                    <td>{permiso.espacio.nombre}</td>
                                    <td>{fechaInicio}</td>
                                    <td>{fechaFin}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AsignarEspacio;
