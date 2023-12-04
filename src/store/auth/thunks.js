import { checkingCredentials, login, logout, resetErrorMsg } from '.'
import {
  loginWithEmail,
  loginWithGoogle,
  logoutFirebase,
  registerWithEmail,
} from '../../firebase/providers'

export const checkingAuth = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startResetErrorMsg = () => {
  return async (dispatch) => {
    dispatch(resetErrorMsg())
  }
}

export const startGoogleLogin = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const res = await loginWithGoogle()

    if (!res.ok) {
      dispatch(logout({ errorMessage: res.errorMessage }))
    }

    dispatch(login(res))
  }
}

export const startEmailRegister = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const { ok, uid, photoURL, errorMessage, role } = await registerWithEmail({
      email,
      password,
      displayName,
    })

    if (!ok) {
      dispatch(logout({ errorMessage }))
      return {}
    }

    dispatch(login({ uid, displayName, email, photoURL, role }))
    return {}
  }
}

export const startLoginWithEmail = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const res = await loginWithEmail({ email, password })

    if (!res.ok) return dispatch(logout(res))

    dispatch(login(res))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()

    dispatch(logout({}))
  }
}
