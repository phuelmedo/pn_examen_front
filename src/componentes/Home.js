import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Listado.css';

const Inicio = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/libros/buscar-libros/ultimos');
        if (response.ok) {
          const data = await response.json();

          setLibros(data);
        } else {
          console.error('Error al obtener la lista de pacientes:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la conexión:', error);
      }
    };

    fetchLibros();
  }, []);

  return (
    <div className="container">
        <h1>Bienvenido!</h1>
        <h1>Lista de Últimos 3 Libros</h1>
        <ul>
          {libros.map((libro) => (
            <li key={libro.id}>
              <p>{`${libro.nombreLibro}`}</p>
              <p>{`${libro.autor}`}</p>
              <p>{`${libro.editorial}`}</p>
            <div>
                <Link to={`/libro/detalle/${libro._id}`}>Ver detalles</Link>
            </div>
            <p>-------------------</p>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Inicio;
