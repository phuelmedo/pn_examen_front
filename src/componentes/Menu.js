import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Listado.css';

function Menu() {
  return (
    <div className="container">
      <h1>Menú de Navegación</h1>
      <ul className="nav">
        <li className="nav-item">
          <NavLink exact to="/">Inicio</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/paciente/nuevo">Nuevo Paciente</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/paciente/listar">Listar Paciente</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/paciente/buscar/:search">Buscar Paciente</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/redirect/:search">Busqueda personalizada</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Menu;