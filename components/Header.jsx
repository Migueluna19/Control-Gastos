import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

function Header({presupuesto, setPresupuesto,valido, setValido,gastos,setGastos}) {
    console.log(presupuesto)
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {valido ?(
            <ControlPresupuesto
            presupuesto={presupuesto}
            gastos={gastos}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setValido={setValido}
            />
        ):(
            <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
         setValido={setValido}
            />
        )}
    </header>
  )
}

export default Header