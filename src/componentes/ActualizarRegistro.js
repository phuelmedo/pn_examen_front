import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import '../styles/AgregarPaciente.css';

const ActualizarPaciente = () => {
    const { id } = useParams();
    const { handleSubmit, setValue, register, getValues } = useForm();
    const [fotoPersonalUrl, setFotoPersonalUrl] = useState('');
    const nav = useNavigate()
    const validator = new SimpleReactValidator({
        messages: {
          required: 'Este campo es obligatorio',
        },
      });

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
            const isRutValid = validator.fieldValid('rut');
            const isNombreValid = validator.fieldValid('nombre');
            const isEdadValid = validator.fieldValid('edad');
            const isEnfermedadValid = validator.fieldValid('enfermedad');
      
            const areRequiredFieldsValid = isNombreValid && isEdadValid && isEnfermedadValid;
    
          if (areRequiredFieldsValid) {
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
              window.alert('Complete los campos');
              console.error('Error al actualizar paciente:', response.statusText);
            }
          } else {
            console.log('Formulario no válido. Por favor, corrija los errores.');
            window.alert('Complete todos los campos obligatorios');
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
              <span style={{ color: 'red' }}>{validator.message('rut', getValues('rut'), 'required')}</span>
            </div>
    
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" {...register('nombre')} />
              <span style={{ color: 'red' }}>{validator.message('nombre', getValues('nombre'), 'required')}</span>
            </div>
    
            <div className="form-group">
              <label>Edad:</label>
              <input type="number" name="edad" {...register('edad')} />
              <span style={{ color: 'red' }}>{validator.message('edad', getValues('edad'), 'required')}</span>
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
              <span style={{ color: 'red' }}>{validator.message('enfermedad', getValues('enfermedad'), 'required')}</span>
            </div>
    
            <button type="submit">Actualizar Paciente</button>
          </form>
        </div>
      );
    };

export default ActualizarPaciente;