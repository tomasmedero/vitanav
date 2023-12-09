import { useEffect, useState } from 'react'
import { LoadHospitals } from '../firebase/providers'
import { useSelector } from 'react-redux'

export const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState([])

  useEffect(() => {
    const fetchHospitals = async () => {
      const allHospitals = await LoadHospitals()
      setHospitals(allHospitals)
    }

    fetchHospitals()
  }, [])

  const { uid } = useSelector((state) => state.auth)

  return (
    <>
      <h1 className='text-3xl font-bold text-center my-5'>
        Lista de Hospitales
      </h1>
      <div className='flex flex-col items-center'>
        <div className='inline-flex mt-2 xs:mt-0'>
          <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-800 rounded-s hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            Todos
          </button>
          <button className='flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-800 border-0 border-s border-gray-700 rounded-e hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            Favoritos
          </button>
        </div>
      </div>

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
            {hospitals.map((hospital) => (
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
                      onClick={() => console.log('Fav')}
                      className='font-medium text-red-600 dark:text-red-500 hover:underline bg-red-200 px-2 py-1 rounded'
                    >
                      Fav
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
