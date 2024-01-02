import React, { useState, useEffect } from 'react';
import '../styles/Listado.css';

const Inicio = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/pacientes/buscar');
        if (response.ok) {
          const data = await response.json();

          const ultimos5Pacientes = data.slice(-5);

          setPacientes(ultimos5Pacientes);
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
        <h1>Bienvenido!</h1>
        <h1>Lista de Últimos 5 Pacientes</h1>
        <ul>
            {pacientes.map((paciente) => (
            <li key={paciente.id}>
                <p>{`${paciente.nombre}`}</p>
                {console.log('URL de la imagen:', paciente.foto)}
                <img src={paciente.fotoPersonal} alt={`Foto de ${paciente.nombre}`} />
            </li>
            ))}
        </ul>
    </div>
  );
};

export default Inicio;
