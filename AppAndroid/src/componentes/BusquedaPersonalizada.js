import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Listado.css';

const BuscarRegistro = () => {
  const [nombreLibro, setNombreLibro] = useState('');
  const [autor, setAutor] = useState('');
  const [editorial, setEditorial] = useState('');
  const [libros, setLibros] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    try {
      const queryParams = new URLSearchParams({
        nombreLibro,
        autor,
        editorial,
      });

      const url = `http://localhost:3001/api/libros/buscar?${queryParams}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setLibros(data);
        setBusquedaRealizada(true); 
      } else {
        console.error('Error en la solicitud:', response.statusText);
        setLibros([]); 
        setBusquedaRealizada(true); 
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setLibros([]);
      setBusquedaRealizada(true); 
    }
  };

  useEffect(() => {
    if (busquedaRealizada) {
    }
  }, [busquedaRealizada]);

  return (
    <div className="container">
      <h1>Busqueda Personalizada</h1>

      <div>
        <label>Nombre libro: </label>
        <input type="text" value={nombreLibro} onChange={(e) => setNombreLibro(e.target.value)} />
      </div>

      <div>
        <label>Autor: </label>
        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
      </div>

      <div>
        <label>Editorial: </label>
        <input type="text" value={editorial} onChange={(e) => setEditorial(e.target.value)} />
      </div>

      <button onClick={handleBuscar}>Buscar</button>
      {busquedaRealizada && (
        <>
          {libros.length > 0 ? (
            <ListarLibros libros={libros} />
          ) : (
            <p>No se encontraron registros.</p>
          )}
        </>
      )}
    </div>
  );
};

const ListarLibros = ({ libros }) => {
  return (
    <div className="container">
      <h1>Lista de Libros</h1>
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

export default BuscarRegistro;
