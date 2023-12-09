import { useEffect, useState } from 'react'
import { updateHospitalWaitingPatients } from '../firebase/providers'
import { startSavingActiveHospitals } from '../store/hospital/thunks'
import { useDispatch, useSelector } from 'react-redux'

export const PatientsComponent = () => {
  const [hospitalByUser, setHospitalByUser] = useState([])
  const [countWaiting, setCountWaiting] = useState()
  const { uid } = useSelector((state) => state.auth)
  const { active } = useSelector((state) => state.hospital)
  const dispatch = useDispatch()

  useEffect(() => {
    const searchHospital = async (id) => {
      dispatch(startSavingActiveHospitals(id))
    }

    searchHospital(uid)
  }, [dispatch, uid])

  useEffect(() => {
    setHospitalByUser(active)
    setCountWaiting(active.pacientesEnEspera)
  }, [active])

  const incrementCounter = () => {
    setCountWaiting((prevCount) => prevCount + 1)
  }

  const decrementCounter = () => {
    setCountWaiting((prevCount) => (prevCount > 0 ? prevCount - 1 : 0))
  }

  const submitCount = () => {
    if (!hospitalByUser || !hospitalByUser.id) {
      console.error('hospitalByUser es undefined o no tiene una propiedad id')
      return
    }

    try {
      updateHospitalWaitingPatients(hospitalByUser.id, countWaiting)
    } catch (error) {
      console.error('Error al actualizar pacientes:', error)
    }
  }
  return (
    <>
      <div className='divAdmin w-full md:w-1/2 mx-auto min-h-[79.8vh] flex flex-col justify-center'>
        <h2 className='text-2xl md:text-3xl my-5 font-semibold text-center'>
          {hospitalByUser.nombre}
        </h2>

        <p className='text-center'>
          Por favor actualice la lista de espera según las personas que ingresen
          y egresen del establecimiento
        </p>
        <div className='divCounter'>
          <p className='text-3xl mb-10 text-center'>Pacientes en espera:</p>
          <div className='flex items-center justify-center mb-6'>
            <button
              onClick={incrementCounter}
              className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded mr-5 text-5xl'
            >
              +
            </button>
            <p className='text-5xl font-bold'>{countWaiting}</p>
            <button
              onClick={decrementCounter}
              className='bg-red-400 hover:bg-red-600 text-white font-bold py-6 px-8 rounded ml-5 text-5xl'
            >
              -
            </button>
          </div>
          <div className='flex items-center justify-center mb-6'>
            <button
              onClick={submitCount}
              className='bg-green-400 hover:bg-green-600 text-white font-bold py-6 px-8 rounded text-5xl'
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
