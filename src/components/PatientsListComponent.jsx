import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const PatientsListComponent = () => {
  const { active } = useSelector((state) => state.hospital)

  return (
    <>
      <h1 className='text-3xl font-bold text-center my-5'>
        Administracion de mis hospitales
      </h1>
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
            {active.map((hospital) => (
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

                <td className='flex items-center px-6 py-4'>
                  <Link
                    to={`/adminPatients/${hospital.id}`}
                    type='button'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline bg-blue-200 px-2 py-1 rounded mr-2'
                  >
                    Consultar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
