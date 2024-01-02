import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import '../styles/AgregarPaciente.css';

const ActualizarPaciente = () => {
    const { id } = useParams();
    const { handleSubmit, setValue, register, getValues } = useForm();
    const [fotoPersonalUrl, setFotoPersonalUrl] = useState('');
    const nav = useNavigate()

    const obtenerInformacionPaciente = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/pacientes/buscar/${id}`);
        if (response.ok) {
        const data = await response.json();
        Object.keys(data).forEach((key) => {
            setValue(key, data[key]);
            if (key === 'fotoPersonal') {
                setFotoPersonalUrl(data[key]);
            }
        });
        } else {
        console.error('Error al obtener la información del paciente:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la conexión:', error);
    }
    };

    useEffect(() => {
        obtenerInformacionPaciente();
      }, [id]);

      const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFotoPersonalUrl(URL.createObjectURL(file));
        }
      };
      

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('rut', data.rut);
      formData.append('nombre', data.nombre);
      formData.append('edad', data.edad);
      formData.append('sexo', data.sexo);
      formData.append('enfermedad', data.enfermedad);

      if (data.fotoPersonal[0] instanceof File) {
        formData.append('fotoPersonal', data.fotoPersonal[0]);
      } else {
        formData.append('fotoPersonal', fotoPersonalUrl);
      }

      const response = await fetch(`http://localhost:3001/api/pacientes/modify/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Paciente actualizado exitosamente');
        nav('/paciente/listar');
      } else {
        console.error('Error al actualizar paciente:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <div className="container">
      <h1>Actualizar Paciente</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label>RUT:</label>
          <input type="text" name="rut" {...register('rut')} />
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" {...register('nombre')} />
        </div>

        <div className="form-group">
          <label>Edad:</label>
          <input type="number" name="edad" {...register('edad')} />
        </div>

        <div className="form-group">
          <label>Sexo:</label>
          <select name="sexo" {...register('sexo')}>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="form-group">
            <label>Foto Personal:</label>
            <input
                type="file"
                name="fotoPersonal"
                {...register('fotoPersonal')}
                onChange={handleFotoChange}
            />
            {fotoPersonalUrl && <img src={fotoPersonalUrl} alt="Foto Personal" />}
        </div>

        <div className="form-group">
          <label>Enfermedad:</label>
          <input type="text" name="enfermedad" {...register('enfermedad')} />
        </div>

        <button type="submit">Actualizar Paciente</button>
      </form>
    </div>
  );
};

export default ActualizarPaciente;