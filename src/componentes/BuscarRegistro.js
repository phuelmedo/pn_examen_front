import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Listado.css';


const BuscarRegistro = ({ onBuscar }) => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleBuscar = () => {
    navigate(`/paciente/detalle/${id}`);
  };

  return (
    <div className="container">
      <h1>Buscar Registro por Id</h1>
      <label>Id:  </label>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <Link to={`/paciente/detalle/${id}`}>
        <button onClick={handleBuscar}>Buscar</button>
      </Link>
    </div>
  );
};

export default BuscarRegistro;