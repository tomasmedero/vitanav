import { Link } from 'react-router-dom'

export const AdminPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='mb-6 text-4xl font-bold text-gray-700'>Admin</h1>
      <div className='flex flex-col space-y-4'>
        <Link
          to='/admin/user'
          className='px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 text-center'
        >
          Lista Usuarios
        </Link>
        <Link
          to='/admin/hospital'
          className='px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 text-center'
        >
          Lista Hospitales
        </Link>
        <Link
          to='/createHospital'
          className='px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 text-center'
        >
          Crear Hospitales
        </Link>
      </div>
    </div>
  )
}
