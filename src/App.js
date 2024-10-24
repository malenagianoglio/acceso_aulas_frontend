import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import Usuarios from './components/Usuarios/Usuarios';
import UsuariosNuevo from './components/Usuarios/UsuariosNuevo';
import UsuariosDetalle from './components/Usuarios/UsuarioDetalles';
import Espacios from './components/Espacios/Espacios';
import EspaciosNuevo from './components/Espacios/EspaciosNuevo';
import EspaciosDetalle from './components/Espacios/EspacioDetalles';
import GestionAcceso from './components/GestionAcceso/GestionAcceso';
import HistorialAcceso from './components/HistorialAccesos/HistorialAccesos';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/nuevo" element={<UsuariosNuevo />} />
            <Route path="/usuarios/:id" element={<UsuariosDetalle />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/espacios/nuevo" element={<EspaciosNuevo/>} />
            <Route path="/espacios/:id" element={<EspaciosDetalle/>} />
            <Route path="/gestionAcceso" element={<GestionAcceso />} />
            <Route path="/historialAcceso" element={<HistorialAcceso />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
