import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UsuarioAlta = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('alumno');
    const [uid, setUid] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/usuarios', {
                nombre,
                apellido,
                dni,
                email,
                rol,
                uid,
            });
            alert('Usuario agregado exitosamente');
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };

    return (
        <div className='formulario-nuevo'>
            <h2 className='title'>Nuevo Usuario</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre del usuario"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Ingrese el apellido del usuario"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formDni">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                    type="number"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ingrese el DNI del usuario"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese el email del usuario"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formRol">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                    as="select"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    required
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
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="Ingrese el UID del usuario"
                    required
                />
            </Form.Group>
            <Button variant="dark" type="submit">
                Agregar Usuario
            </Button>
        </Form>
        </div>
    );
};

export default UsuarioAlta;
