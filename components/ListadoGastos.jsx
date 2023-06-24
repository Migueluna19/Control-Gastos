import React from 'react'
import Gasto from './Gasto'

function ListadoGastos({gastos,setGastoEditar,eliminarGasto,gastosfiltro,filtro}) {
  return (
    <div className='Listado-gastos contenedor'>
        {
          filtro?(
            <>
             <h2>{gastosfiltro.length ? 'Gastos':'No hay Gastos en esta Categoria'}</h2>
           { gastosfiltro.map(gasto=>(
              <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              />
          ))}
          </>
          ):(
            <>
                  <h2>{gastos.length ? 'Gastos':'No hay Gastos Aún'}</h2>
                {gastos.map(gasto=>(
                  <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                  />
              ))}
          </>
          )
        }
        
    </div>
  )
}

export default ListadoGastos