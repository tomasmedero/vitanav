import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById, updateUserRole } from '../firebase/providers'
import Swal from 'sweetalert2'

export const AdminEditUserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [role, setRole] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const searchUser = async (id) => {
      const user = await getUserById(id)
      setUser(user)
      setRole(user.role)
    }

    searchUser(id)
  }, [id])

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole)
      navigate('/admin/user')
    } catch (error) {
      Swal.fire('Error al actualizar el rol del usuario:', error, 'error')
    }
  }

  const onBack = async () => {
    navigate('/admin/user')
  }
  //Dar estilos a la pagina
  return (
    <div className='flex flex-col items-center mt-10 mb-10'>
      <h1 className='text-3xl font-bold text-center my-5'>Editar Usuario</h1>
      <div key={user.uid} className='mb-2'>
        <p>{user.email}</p>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='border-gray-300 rounded-md'
        >
          <option value='user'>Usuario</option>
          <option value='adminUser'>Admin Web</option>
          <option value='hospitalAdminUser'>Admin Hospital</option>
        </select>
      </div>

      <button
        onClick={() => handleRoleChange(user.uid, role)}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Actualizar cambios
      </button>
      <button
        onClick={() => onBack()}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      >
        Volver
      </button>
    </div>
  )
}
