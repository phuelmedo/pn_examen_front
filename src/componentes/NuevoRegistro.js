import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import '../styles/AgregarPaciente.css';

const AgregarPaciente = () => {
  const { handleSubmit, errors } = useForm();
  const [fotoPersonalUrl, setFotoPersonalUrl] = useState(null);
  const nav = useNavigate()

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFotoPersonalUrl(url);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData(document.querySelector('form'));

      const response = await fetch('http://localhost:3001/api/pacientes/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Paciente agregado exitosamente');
        nav('/paciente/listar')
      } else {
        console.error('Error al agregar paciente:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <div className="container">
      <h1>Agregar Nuevo Paciente</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>RUT:</label>
          <input type="text" name="rut"/>
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="nombre"/>
        </div>

        <div className="form-group">
          <label>Edad:</label>
          <input type="number" name="edad"/>
        </div>

        <div className="form-group">
          <label>Sexo:</label>
          <select name="sexo">
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="form-group">
          <label>Foto Personal:</label>
          <input
            type="file"
            name="fotoPersonal"
            onChange={handleFotoChange}
          />
          {fotoPersonalUrl && <img src={fotoPersonalUrl} alt="Foto Personal" />}
        </div>

        <div className="form-group">
          <label>Enfermedad:</label>
          <input type="text" name="enfermedad"/>
        </div>

        <button type="submit">Agregar Paciente</button>
      </form>
    </div>
  );
};

export default AgregarPaciente;