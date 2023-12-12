import { useEffect, useState } from 'react'
import { deleteUserById, getAllUsers } from '../firebase/providers'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const AdminUserPage = () => {
  const [usersState, setUsersState] = useState([])

  const { users } = useSelector((state) => state.users)

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = users
      setUsersState(allUsers)
    }

    fetchUsers()
  }, [users])

  const onDelete = async (id) => {
    try {
      if (
        window.confirm(
          '¿Estás seguro que deseas eliminar este juego? Esta acción no se puede deshacer'
        )
      ) {
        await deleteUserById(id)
        const allUsers = await getAllUsers()
        setUsersState(allUsers)
      }
    } catch (error) {
      console.error('No se pudo eliminar el usuario')
    }
  }

  const roleNames = {
    adminUser: 'Admin de Web',
    user: 'Usuario',
    hospitalAdminUser: 'Admin de Hospital',
  }

  return (
    <>
      <h1 className='text-3xl font-bold text-center my-5'>Lista de Usuarios</h1>
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
            {usersState.map((user) => (
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
                    to={`/admin/user/${user.uid}`}
                    type='button'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline bg-blue-200 px-2 py-1 rounded mr-2'
                  >
                    Editar
                  </Link>

                  <button
                    //TODO hacer el delete
                    onClick={() => onDelete(user.uid)}
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
    </>
  )
}
