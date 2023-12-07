import { useEffect, useState } from 'react'
import { getAllUsers } from '../firebase/providers'
import { Link } from 'react-router-dom'

export const AdminUserPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers()
      setUsers(allUsers)
    }

    fetchUsers()
  }, [])

  const roleNames = {
    adminUser: 'Admin de Web',
    user: 'Usuario',
    hospitalAdminUser: 'Admin de Hospital',
  }

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-10'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Nombre
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Rol
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.uid}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {user.displayName}
              </th>
              <td className='px-6 py-4'>{user.email}</td>
              <td className='px-6 py-4'>{roleNames[user.role]}</td>

              <td className='flex items-center px-6 py-4'>
                <Link
                  to={`/adminUser/${user.uid}`}
                  type='button'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline bg-blue-200 px-2 py-1 rounded mr-2'
                >
                  Editar
                </Link>

                <button
                  onClick={() => console.log('Remove')}
                  className='font-medium text-red-600 dark:text-red-500 hover:underline bg-red-200 px-2 py-1 rounded'
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
