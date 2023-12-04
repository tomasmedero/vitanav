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
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.email}</p>
          <select
            value={user.role}
            onChange={(e) => handleRoleChange(user.id, e.target.value)}
          >
            <option value='userComun'>User Comun</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
      ))}
    </div>
  )
}
