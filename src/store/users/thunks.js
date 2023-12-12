import { getActiveUser, getAllUsers } from '../../firebase/providers'
import { setActiveUser, setUsers } from './usersSlice'

export const startLoadingUsers = () => {
  return async (dispatch) => {
    const users = await getAllUsers()
    dispatch(setUsers(users))
  }
}

export const startLoadingActiveUser = () => {
  return async (dispatch) => {
    const currentUser = await getActiveUser()

    dispatch(setActiveUser(currentUser))
  }
}
