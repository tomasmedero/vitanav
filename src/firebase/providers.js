import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth/cordova'
import { FirebaseAuth, FirebaseDB } from './config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'

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

export const createUserRolInFirestore = async (user) => {
  const userRef = doc(FirebaseDB, 'usersRol', user.uid)
  await setDoc(userRef, user)
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

    const newUserRole = await createUserRolInFirestore({
      uid,
      displayName,
      email,
      role: 'user',
    })

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
      role: newUserRole.role,
    }
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

export const getAllUsers = async () => {
  const usersCollection = collection(FirebaseDB, 'users')
  const userSnapshot = await getDocs(usersCollection)
  const users = userSnapshot.docs.map((doc) => doc.data())
  return users
}

// export const updateUserRole = async (userId, newRole) => {
//   // Código para actualizar el rol de un usuario
// }
