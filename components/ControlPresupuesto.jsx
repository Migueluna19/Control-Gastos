import {useState, useEffect } from "react"
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
function ControlPresupuesto({presupuesto,gastos,setGastos,setPresupuesto,setValido}) {

    const [disponible, setDisponible]=useState(0)
    const [gastado, setGastado]=useState(0)
    const [nuevoPorcentaje, setPorcentaje]=useState(0)

    useEffect(()=>{
        const totalGastado=gastos.reduce((total,gasto)=> gasto.cantidad + total, 0)
        setGastado(totalGastado)
        const totalDisponible=presupuesto-totalGastado
        setDisponible(totalDisponible)
        //Calculo de Porcentaje Grafica
        const nuevoPorcentaje=(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500);
    },[gastos])

    function formatearCantidad (cantidad){
       return cantidad.toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        })}

    function handleResetApp(){
        const resultado=confirm('¿Deseas Reiniciar Presupuesto y Gastos?');
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setValido(false)
        }
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
           <CircularProgressbar
           styles={buildStyles({
            pathColor:nuevoPorcentaje>100?'#DC2626':'#3B82F6',
            trailColor:'#F5F5F5',
            pathTransitionDuration:0.8,
            textColor:nuevoPorcentaje>100?'#DC2626':'#3B82F6'
           })}
           value={nuevoPorcentaje}
           text={`${nuevoPorcentaje}% Gastado`}
           />
        </div>
        <div className='contenido-presupuesto'>
            <button className="reset-app"
            type="button"
            onClick={handleResetApp}
            >Resetear Presupuesto</button>
        <p>
            <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible<0 ? 'negativo':''}`}>
            <span>Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
            <span>Gastado: </span>{formatearCantidad(gastado)}
        </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto