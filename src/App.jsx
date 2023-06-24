import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Modal from '../components/Modal';
import ListadoGastos from '../components/ListadoGastos';
import Filtro from '../components/Filtro';
import { generarId } from './helpers';
import iconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  const [presupuesto, setPresupuesto]=useState(
    Number(localStorage.getItem('presupuesto'))?? 0
  );
  const [valido, setValido]=useState(false);
  const [modal, setModal]=useState(false);
  const [animarModal, setAnimarModal]=useState(false);
  const [gastos, setGastos]=useState(
    localStorage.getItem('gastos')?JSON.parse(localStorage.getItem('gastos')):[]
  )
  const [gastoEditar, setGastoEditar]=useState({})
  const [filtro, setFiltro]=useState('')
  const [gastosfiltro, setGastosFiltro]=useState([])

  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      setModal(true);
    setTimeout(()=>{
      setAnimarModal(true);
    },500)
    }
  },[gastoEditar])

  useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos)??[])
  },[gastos])

  useEffect(()=>{
    const presupuestoLS=Number(localStorage.getItem('presupuesto'))??0;
    if(presupuestoLS>0){
      setValido(true)
    }
  },[]);

  useEffect(()=>{
   if(filtro){
    //Filtrar si se selecciono algo en el select
    const gastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro)
    setGastosFiltro(gastosFiltrados)
   }
  },[filtro]);

  function handleNuevoGasto(){
    setGastoEditar({})
    setModal(true);
    setTimeout(()=>{
      setAnimarModal(true);
    },500)
  }
  const guardarGasto = (gasto)=>{
    if(gasto.id){
      //Actualizar Registro
      const gastosActualizados=gastos.map(gastoState=>gastoState.id===gasto.id?gasto:gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }
    else{
      //Nuevo Gasto
      gasto.id=generarId();
    gasto.fecha=Date.now();
    setGastos([...gastos,gasto])
    }
    
    setAnimarModal(false);
       setTimeout(()=>{
        setModal(false);
       },500)
  }
  function eliminarGasto(id){
    const gastosActualizados=gastos.filter(gasto=>gasto.id!==id);
    setGastos(gastosActualizados);
  }
  return (
    <div className={modal ? 'fijar':''}>
     <Header
     presupuesto={presupuesto}
     setPresupuesto={setPresupuesto}
     valido={valido}
     setValido={setValido}
     gastos={gastos}
     setGastos={setGastos}
     />
     {valido&&(
      <>
      <main>
        <Filtro
        filtro={filtro}
        setFiltro={setFiltro}
        />
      <ListadoGastos
      gastos={gastos}
      setGastoEditar={setGastoEditar}
      eliminarGasto={eliminarGasto}
      gastosfiltro={gastosfiltro}
      filtro={filtro}
      />
      </main>
      <div className='nuevo-gasto'>
      <img src={iconoNuevoGasto}
      alt='Icono Nuevo Gasto'
      onClick={handleNuevoGasto}
      />
     </div>
     </>
     )}
     {modal && 
     <Modal
     setModal={setModal}
     animarModal={animarModal}
     setAnimarModal={setAnimarModal}
     guardarGasto={guardarGasto}
     gastoEditar={gastoEditar}
     setGastoEditar={setGastoEditar}
     />}
    </div>
  )
}

export default App
