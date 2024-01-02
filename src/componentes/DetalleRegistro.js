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
        const response = await fetch(`http://localhost:3001/api/pacientes/buscar/${id}`);
        if (response.ok) {
            const data = await response.json();
            setRegistro(data);
          } else {
            console.error('Paciente no encontrado');
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
      await fetch(`http://localhost:3001/api/pacientes/delete/${id}`, { method: 'DELETE' });
      navigate('/paciente/listar');
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
        <p>RUT: {registro.rut}</p>
        <p>Nombre: {registro.nombre}</p>
        <p>Edad: {registro.edad}</p>
        <p>Sexo: {registro.sexo}</p>
        <p>Enfermedad: {registro.enfermedad}</p>
        <p>Fecha de Ingreso: {new Date(registro.fechaIngreso).toLocaleString()}</p>
        {registro.fotoPersonal ? (
                <img src={registro.fotoPersonal} alt="Foto Personal" />
            ) : (
                <p>Paciente sin imagen</p>
            )}
        <div>
            <Link to={`/paciente/actualizar/${id}`}>Actualizar Registro</Link>
        </div>
        <div>
            <Link onClick={handleEliminar}>Eliminar Registro</Link>
        </div>
    </div>
  );
};

export default DetalleRegistro;