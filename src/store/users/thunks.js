import { getActiveUser, getAllUsers } from '../../firebase/providers'
import { cleanActiveUser, setActiveUser, setUsers } from './usersSlice'

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

export const startLogoutUserActive = () => {
  return async (dispatch) => {
    dispatch(cleanActiveUser({}))
  }
}
