import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Listado.css';

const ListarPacientes = () => {
    const [pacientes, setPacientes] = useState([]);
  
    useEffect(() => {
      const fetchPacientes = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/pacientes/buscar');
          if (response.ok) {
            const data = await response.json();
            console.error('Error en la conexión:', pacientes);
            setPacientes(data);
          } else {
            console.error('Error al obtener la lista de pacientes:', response.statusText);
          }
        } catch (error) {
          console.error('Error en la conexión:', error);
        }
      };
  
      fetchPacientes();
    }, []);
  
    return (
      <div className="container">
        <h1>Lista de Pacientes</h1>
        <ul>
          {pacientes.map((paciente) => (
            <li key={paciente.id}>
              <p>{`${paciente.nombre}`}</p>
                {paciente.fotoPersonal ? (
                <img src={paciente.fotoPersonal} alt="Foto Personal" />
                ) : (
                <p>Paciente sin imagen</p>
                )}
            <div>
                <Link to={`/paciente/detalle/${paciente._id}`}>Ver detalles</Link>
            </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default ListarPacientes;