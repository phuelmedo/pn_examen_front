import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import '../styles/AgregarRegistro.css';

const ActualizarRegistro = () => {
    const { id } = useParams();
    const { handleSubmit, setValue, register, getValues, reset } = useForm();
    const [fotoPersonalUrl, setFotoPersonalUrl] = useState('');
    const nav = useNavigate()
    const validator = new SimpleReactValidator({
        messages: {
          required: 'Este campo es obligatorio',
        },
      });

    const obtenerInformacionLibro = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/libros/buscar/${id}`);
        if (response.ok) {
        const data = await response.json();
        Object.keys(data).forEach((key) => {
            setValue(key, data[key]);
            if (key === 'portada') {
                setFotoPersonalUrl(data[key]);
            }
        });
        } else {
        console.error('Error al obtener la información del libro:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la conexión:', error);
    }
    };

    useEffect(() => {
      obtenerInformacionLibro();
      }, [id]);

      const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFotoPersonalUrl(URL.createObjectURL(file));
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
            const formData = new FormData();
            formData.append('ISBN', data.ISBN);
            formData.append('nombreLibro', data.nombreLibro);
            formData.append('autor', data.autor);
            formData.append('editorial', data.editorial);
            formData.append('paginas', data.paginas);
    
            if (data.portada[0] instanceof File) {
              formData.append('portada', data.fotoPersonal[0]);
            } else {
              formData.append('portada', fotoPersonalUrl);
            }
    
            const response = await fetch(`http://localhost:3001/api/libros/modify/${id}`, {
              method: 'PUT',
              body: formData,
            });
            console.log(response);
            if (response.ok) {
              console.log('Libro actualizado exitosamente');
              nav('/libro/listar');
            } else {
              window.alert('Complete los campos');
              console.error('Error al actualizar libro:', response.statusText);
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
          <h1>Actualizar Libro</h1>
    
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>ISBN:</label>
              <input type="text" name="ISBN" {...register('ISBN')} />
              <span style={{ color: 'red' }}>{validator.message('ISBN', getValues('ISBN'), 'required')}</span>
            </div>
    
            <div className="form-group">
              <label>Nombre Libro:</label>
              <input type="text" name="nombreLibro" {...register('nombreLibro')} />
              <span style={{ color: 'red' }}>{validator.message('nombreLibro', getValues('nombreLibro'), 'required')}</span>
            </div>
    
            <div className="form-group">
              <label>Autor:</label>
              <input type="text" name="autor" {...register('autor')} />
              <span style={{ color: 'red' }}>{validator.message('autor', getValues('autor'), 'required')}</span>
            </div>
    
            <div className="form-group">
              <label>Editorial:</label>
              <input type="text" name="editorial" {...register('editorial')} />
              <span style={{ color: 'red' }}>{validator.message('editorial', getValues('editorial'), 'required')}</span>
            </div>
    
            <div className="form-group">
              <label>Foto Personal:</label>
              <input
                type="file"
                name="portada"
                {...register('portada')}
                onChange={handleFotoChange}
              />
              {fotoPersonalUrl && <img src={fotoPersonalUrl} alt="Foto Personal" />}
            </div>
    
            <div className="form-group">
              <label>Paginas:</label>
              <input type="number" name="paginas" {...register('paginas')} />
              <span style={{ color: 'red' }}>{validator.message('paginas', getValues('paginas'), 'required')}</span>
            </div>
    
            <button type="submit">Actualizar Libro</button>
          </form>
        </div>
      );
    };

export default ActualizarRegistro;