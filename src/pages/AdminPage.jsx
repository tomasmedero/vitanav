import { Link } from 'react-router-dom'

export const AdminPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='mb-4 text-2xl font-bold text-gray-700'>
        Página de Administración
      </h1>
      <div className='space-y-2'>
        <Link
          to='/admin/adminUser'
          className='px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700'
        >
          Ir a Usuarios
        </Link>
        <Link
          to='/admin/hospital'
          className='px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700'
        >
          Ir a Hospitales
        </Link>
      </div>
    </div>
  )
}
