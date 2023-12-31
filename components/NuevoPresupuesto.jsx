import {useState} from 'react'
import Mensaje from './Mensaje';
function NuevoPresupuesto({presupuesto, setPresupuesto,setValido}) {
    const [mensaje, setMensaje]=useState('')
    function handlePresupuesto (e){
        e.preventDefault();
        if(!presupuesto|| presupuesto<0){
            setMensaje('No es un presupuesto válido');
            return;
        }
        setMensaje('');
        setValido(true);
    }
    
  return (
    <div className='contenedor-presupuesto contenedor sombra '>
   <form onSubmit={handlePresupuesto} className='formulario'>
    <div className='campo'>
        <label className='campo-label'>Define tu Presupuesto</label>
        <input 
        className='nuevo-presupuesto'
        type="number" 
        placeholder='Añade tu Presupuesto'
        value={presupuesto}
        onChange={e=>setPresupuesto(Number(e.target.value))}
        />
    </div>
    <input type="submit" value="Añadir" />
    {mensaje &&<Mensaje tipo="error">{mensaje}</Mensaje>}
   </form>
    </div>
  )
}

export default NuevoPresupuesto