import React, {Fragment, useEffect, useState} from 'react'
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  //citas en localstorage.
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  };
  

  //arreglo de citas.
  const [ citas, guardarCitas ] = useState([citasIniciales]);
  //función que toma la citas actuales y agrega la nueva.
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
    //console.log(citas);
  };
  //función que elimina una cita por su id.
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.mascota !== id);
    guardarCitas(nuevasCitas);
  };
  //mensaje condicional para cambiar el mensaje cuando no existan citas.
  const titulo = citas.length === 0 ? 'No hay citas': 'Administra tus citas';
  //use effect para realizar ciertas operaciones cuando el state cambia.
  useEffect( () => {
    //si existen citas se agregan al localstorage.
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);
  return (
    <Fragment>
      <h1>Administrador De Pacientes</h1>

      <div className="container">
        <div className='row'>
          <div className='one-half column'>
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
   
  );
}

export default App;
