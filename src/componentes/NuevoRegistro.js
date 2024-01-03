import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator';
import '../styles/AgregarPaciente.css';

const AgregarPaciente = () => {
  const { handleSubmit, errors } = useForm();
  const [fotoPersonalUrl, setFotoPersonalUrl] = useState(null);
  const nav = useNavigate()

  const rutRef = useRef();
  const nombreRef = useRef();
  const edadRef = useRef();
  const enfermedadRef = useRef();
  const validator = new SimpleReactValidator({
    autoForceUpdate: this,
    messages: {
      required: 'Este campo es obligatorio',
    },
  });

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFotoPersonalUrl(url);
    }
  };

  const onSubmit = async (data) => {
    try {
        const isRutValid = validator.fieldValid('rut');
        const isNombreValid = validator.fieldValid('nombre');
        const isEdadValid = validator.fieldValid('edad');
        const isEnfermedadValid = validator.fieldValid('enfermedad');

      const areRequiredFieldsValid = isRutValid && isNombreValid && isEdadValid && isEnfermedadValid;

      if (areRequiredFieldsValid) {
        const formData = new FormData(document.querySelector('form'));

        const response = await fetch('http://localhost:3001/api/pacientes/create', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Paciente agregado exitosamente');
          nav('/paciente/listar');
        } else {
          console.error('Error al agregar paciente:', response.statusText);
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
      <h1>Agregar Nuevo Paciente</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label>RUT:</label>
          <input type="text" name="rut" ref={rutRef} />
          <span style={{ color: 'red' }}>{validator.message('rut', rutRef.current?.value, 'required')}</span>
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" ref={nombreRef}/>
          <span style={{ color: 'red' }}>{validator.message('nombre', nombreRef.current?.value, 'required')}</span>
        </div>

        <div className="form-group">
          <label>Edad:</label>
          <input type="number" name="edad" ref={edadRef}/>
          <span style={{ color: 'red' }}>{validator.message('edad', edadRef.current?.value, 'required')}</span>
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
          <input type="text" name="enfermedad" ref={enfermedadRef}/>
          <span style={{ color: 'red' }}>{validator.message('enfermedad', enfermedadRef.current?.value, 'required')}</span>
        </div>

        <button type="submit">Agregar Paciente</button>
      </form>
    </div>
  );
};

export default AgregarPaciente;