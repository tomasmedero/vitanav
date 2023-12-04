import { useEffect, useState } from 'react'
import { getAllUsers } from '../firebase/providers'

export const AdminUserPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers()
      setUsers(allUsers)
    }

    fetchUsers()
  }, [])

  const handleRoleChange = async (userId, newRole) => {
    // await updateUserRole(userId, newRole)
    // // Actualizar la lista de usuarios después de cambiar el rol
    // const allUsers = await getAllUsers()
    // setUsers(allUsers)
    console.log(userId, newRole)
  }

  console.log(users)
  return (
    <div className='flex flex-col items-center'>
      {users.map((user) => (
        <div key={user.uid} className='mb-2'>
          <p>{user.email}</p>
          <select
            value={user.role}
            onChange={(e) => handleRoleChange(user.uid, e.target.value)}
            className='border-gray-300 rounded-md'
          >
            <option value='user'>User Comun</option>
            <option value='adminUser'>Admin Web</option>
            <option value='hospitalAdminUser'>Admin Hospital</option>
          </select>
        </div>
      ))}
      <button
        onClick={() => console.log('Actualizar cambios')}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Actualizar cambios
      </button>
    </div>
  )
}
