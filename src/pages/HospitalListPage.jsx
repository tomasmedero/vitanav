import { useCallback, useEffect, useState } from 'react'
import {
  createHospitalFavByUserId,
  deleteHospitalFavByUserId,
  searchHospitalFavByUserId,
} from '../firebase/providers'
import { useSelector } from 'react-redux'
import { FaStar, FaRegStar } from 'react-icons/fa'

export const HospitalListPage = () => {
  const [allHospitals, setAllHospitals] = useState([])
  const [selectedButton, setSelectedButton] = useState('Todos')
  const [favHospitals, setFavHospitals] = useState({})
  const { hospitals } = useSelector((state) => state.hospital)
  const { uid } = useSelector((state) => state.auth)

  const fetchHospitals = useCallback(async () => {
    const allHospitals = hospitals
    setAllHospitals(allHospitals)
  }, [hospitals])

  const fetchHospitalsFavorites = useCallback(async () => {
    if (uid) {
      const favUserHospitals = await searchHospitalFavByUserId(uid)
      setFavHospitals(favUserHospitals)
    }
  }, [uid])

  useEffect(() => {
    fetchHospitals()
    fetchHospitalsFavorites()
  }, [fetchHospitals, fetchHospitalsFavorites])

  const handleFavClick = async (hospital) => {
    if (favHospitals[hospital.id]) {
      const newFavHospitals = { ...favHospitals }
      delete newFavHospitals[hospital.id]
      setFavHospitals(newFavHospitals)
      await deleteHospitalFavByUserId(uid, hospital.id)
    } else {
      await createHospitalFavByUserId(uid, hospital.id)
      setFavHospitals({
        ...favHospitals,
        [hospital.id]: true,
      })
    }
  }

  return (
    <>
      <h1 className='text-3xl font-bold text-center my-5'>
        Lista de Hospitales
      </h1>

      {uid && (
        <div className='flex flex-col items-center'>
          <div className='inline-flex mt-2 xs:mt-0'>
            <button
              className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white rounded-s hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                selectedButton === 'Todos' ? 'bg-blue-800' : 'bg-blue-600'
              }`}
              onClick={() => setSelectedButton('Todos')}
            >
              Todos
            </button>
            <button
              className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white border-0 border-s border-gray-700 rounded-e hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                selectedButton === 'Favoritos' ? 'bg-blue-800' : 'bg-blue-600'
              }`}
              onClick={() => setSelectedButton('Favoritos')}
            >
              Favoritos
            </button>
          </div>
        </div>
      )}

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-10'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Nombre
              </th>
              <th scope='col' className='px-6 py-3'>
                Direccion
              </th>
              <th scope='col' className='px-6 py-3'>
                Telefono
              </th>
              <th scope='col' className='px-6 py-3'>
                Especialidad
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {allHospitals.map((hospital) => (
              <tr
                key={hospital.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {hospital.nombre}
                </th>
                <td className='px-6 py-4'>{hospital.direccion}</td>
                <td className='px-6 py-4'>{hospital.telefono}</td>
                <td className='px-6 py-4'>{hospital.especialidad}</td>

                {uid && (
                  <td className='flex items-center px-6 py-4'>
                    <button
                      onClick={() => handleFavClick(hospital)}
                      className='text-blue-500 hover:text-blue-700'
                    >
                      {favHospitals[hospital.id] ? (
                        <FaStar fill='blue' />
                      ) : (
                        <FaRegStar fill='blue' />
                      )}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
