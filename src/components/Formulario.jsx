import React, {Fragment, useState} from 'react'
// import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    //state de citas, la funcipon será la encargada de modificar el formulario .
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    //función que se ejcuta cuando el usuario escribe en un input.
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    };
    //state error.
    const [ error, actualizarError ] = useState(false); 
    //extraer valores.
    const { mascota, propietario, fecha, hora, sintomas } = cita;
    //cuando el usuario presiona agregar cita.
    const submitCita = e => {
        e.preventDefault();
        //validar.
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        };
        //eliminar mensaje de error.
        actualizarError(false);
        //asignar un id.
        // cita.id = uuid();
        cita.id = 1;
        
        //crear la cita, se pasa la cita a la función creada en app.js.
        crearCita(cita);
        //reiniciar el form, se reinicia el state por el value que tiene cada input.
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    };
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error 
            ? <p className='alerta-error'> Todos los campos son obligatorios</p>
            : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Dueño de la mascota'
                    onChange={actualizarState}
                    value={propietario}
                />
                 <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                 <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                 <label>Síntomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>

                <button
                    type="submit"
                    className='u-full-width button-primary'
                >
                    Agregar Cita
                </button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
};

export default Formulario
