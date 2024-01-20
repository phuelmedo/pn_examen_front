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
          <NavLink to="/libro/nuevo">Nuevo Libro</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/libro/listar">Listar Libros</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/libro/buscar/:search">Buscar Libro</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/redirect/:search">Busqueda personalizada</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Menu;