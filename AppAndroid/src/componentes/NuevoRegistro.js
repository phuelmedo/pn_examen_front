import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator';
import '../styles/AgregarRegistro.css';

const AgregarRegistro = () => {
  const { handleSubmit, errors, reset } = useForm();
  const [fotoPersonalUrl, setFotoPersonalUrl] = useState(null);
  const nav = useNavigate()

  const isbnRef = useRef();
  const nombreLibroRef = useRef();
  const autorRef = useRef();
  const editorialRef = useRef();
  const paginasRef = useRef();
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
        const isIsbnValid = validator.fieldValid('ISBN');
        const isNombreLibroValid = validator.fieldValid('nombreLibro');
        const isAutorValid = validator.fieldValid('autor');
        const isEditorialValid = validator.fieldValid('editorial');
        const isPaginasValid = validator.fieldValid('paginas');

      const areRequiredFieldsValid = isIsbnValid && isNombreLibroValid && isAutorValid && isEditorialValid && isPaginasValid;

      if (areRequiredFieldsValid) {
        const formData = new FormData(document.querySelector('form'));

        const response = await fetch('http://localhost:3001/api/libros/create', {
          method: 'POST',
          body: formData,
        });
        console.log(areRequiredFieldsValid);
        if (response.ok) {

          console.log('Libro agregado exitosamente');
          nav('/libro/listar');
        } else {
          console.error('Error al agregar libro:', response.statusText);
        }
      } else {
        reset();
        console.log('Formulario no válido. Por favor, corrija los errores.');
        window.alert('Complete todos los campos obligatorios');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <div className="container">
      <h1>Agregar Nuevo Libro</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label>ISBN:</label>
          <input type="text" name="ISBN" ref={isbnRef} />
          <span style={{ color: 'red' }}>{validator.message('ISBN', isbnRef.current?.value, 'required')}</span>
        </div>

        <div className="form-group">
          <label>Nombre Libro:</label>
          <input type="text" name="nombreLibro" ref={nombreLibroRef}/>
          <span style={{ color: 'red' }}>{validator.message('nombreLibro', nombreLibroRef.current?.value, 'required')}</span>
        </div>

        <div className="form-group">
          <label>Autor:</label>
          <input type="text" name="autor" ref={autorRef}/>
          <span style={{ color: 'red' }}>{validator.message('autor', autorRef.current?.value, 'required')}</span>
        </div>

        <div className="form-group">
          <label>Editorial:</label>
          <input type="text" name="editorial" ref={editorialRef}/>
          <span style={{ color: 'red' }}>{validator.message('editorial', editorialRef.current?.value, 'required')}</span>
        </div>

        <div className="form-group">
          <label>Portada:</label>
          <input
            type="file"
            name="portada"
            onChange={handleFotoChange}
          />
          {fotoPersonalUrl && <img src={fotoPersonalUrl} alt="Foto Personal" />}
        </div>

        <div className="form-group">
          <label>Paginas:</label>
          <input type="number" name="paginas" ref={paginasRef}/>
          <span style={{ color: 'red' }}>{validator.message('paginas', paginasRef.current?.value, 'required')}</span>
        </div>

        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
};

export default AgregarRegistro;