import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Listado.css';

const BuscarRegistro = () => {
  const [sexo, setSexo] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [enfermedad, setEnfermedad] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    try {
      const queryParams = new URLSearchParams({
        sexo,
        fechaIngreso,
        enfermedad,
      });

      const url = `http://localhost:3001/api/pacientes/buscar?${queryParams}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setPacientes(data);
        setBusquedaRealizada(true); // Actualizar el estado después de la búsqueda
      } else {
        console.error('Error en la solicitud:', response.statusText);
        setPacientes([]); // Limpiar la lista en caso de error
        setBusquedaRealizada(true); // Actualizar el estado después de la búsqueda
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setPacientes([]); // Limpiar la lista en caso de error
      setBusquedaRealizada(true); // Actualizar el estado después de la búsqueda
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
        <label>Sexo: </label>
        <input type="text" value={sexo} onChange={(e) => setSexo(e.target.value)} />
      </div>

      <div>
        <label>Fecha de Ingreso: </label>
        <input type="text" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
      </div>

      <div>
        <label>Enfermedad: </label>
        <input type="text" value={enfermedad} onChange={(e) => setEnfermedad(e.target.value)} />
      </div>

      <button onClick={handleBuscar}>Buscar</button>
      {busquedaRealizada && (
        <>
          {pacientes.length > 0 ? (
            <ListarPacientes pacientes={pacientes} />
          ) : (
            <p>No se encontraron registros.</p>
          )}
        </>
      )}
    </div>
  );
};

const ListarPacientes = ({ pacientes }) => {
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

export default BuscarRegistro;
