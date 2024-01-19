import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/Listado.css';

const DetalleRegistro = () => {
    const { id } = useParams();
    const [registro, setRegistro] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchRegistroDetalle = async () => {
        try {
        const response = await fetch(`http://localhost:3001/api/libros/buscar/${id}`);
        if (response.ok) {
            const data = await response.json();
            setRegistro(data);
          } else {
            console.error('Libro no encontrado');
            setRegistro(null);
          }
        } catch (error) {
        console.error('Error al obtener detalles del registro:', error);
        }
    };
    
    fetchRegistroDetalle();
    }, [id]);

  const handleEliminar = async () => {
    try {
      await fetch(`http://localhost:3001/api/libros/delete/${id}`, { method: 'DELETE' });
      navigate('/libro/listar');
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };

  if (!registro) {
    return (
        <div className="container">
            <h1>Detalle del Registro</h1>
            <p>Registro no existe con el ID: {id}</p>
        </div>
      );
  }

  return (
    <div className="container">
        <h1>Detalle del Registro</h1>
        <p>ISBN: {registro.ISBN}</p>
        <p>Nombre Libro: {registro.nombreLibro}</p>
        <p>Autor: {registro.autor}</p>
        <p>Editorial: {registro.editorial}</p>
        <p>Paginas: {registro.paginas}</p>
        {registro.portada ? (
                <img src={registro.portada} alt="Foto Personal" />
            ) : (
                <p>Libro sin imagen</p>
            )}
        <div>
            <Link to={`/libro/actualizar/${id}`}>Actualizar Registro</Link>
        </div>
        <div>
            <Link onClick={handleEliminar}>Eliminar Registro</Link>
        </div>
    </div>
  );
};

export default DetalleRegistro;