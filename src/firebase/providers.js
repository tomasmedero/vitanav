import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth/cordova'
import { FirebaseAuth } from './config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(FirebaseAuth, googleProvider)

    const { displayName, email, photoURL, uid } = res.user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    }
  }
}

export const loginWithEmail = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid, photoURL, displayName } = resp.user

    return { ok: true, uid, photoURL, displayName }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    }
  }
}

export const registerWithEmail = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )

    const { uid, photoURL } = resp.user

    const currentUser = FirebaseAuth.currentUser

    if (currentUser) {
      await updateProfile(currentUser, { displayName })
    } else {
      throw new Error('No se puede obtener el usuario actual')
    }

    return { ok: true, uid, photoURL, email, displayName }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
