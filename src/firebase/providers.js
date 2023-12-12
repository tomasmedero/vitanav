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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore/lite'

//////////////////////////////////////////////// LOGIN Y REGISTRO

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

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    }
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

    await createUserRolInFirestore({
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
      role: 'user',
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

//////////////////////////////////////////////// USUARIOS

export const getUserRole = async (uid) => {
  const userRef = doc(FirebaseDB, 'usersRol', uid)
  const userDoc = await getDoc(userRef)

  const data = userDoc.data()

  return data.role
}

export const getAllUsers = async () => {
  const usersCollection = collection(FirebaseDB, 'usersRol')
  const userSnapshot = await getDocs(usersCollection)
  const users = userSnapshot.docs.map((doc) => doc.data())
  return users
}

export const getUserById = async (uid, users) => {
  const user = users.find((user) => user.uid === uid)
  return user
}

export const updateUserRole = async (userId, newRole) => {
  const userRef = doc(FirebaseDB, 'usersRol', userId)
  await setDoc(userRef, { role: newRole }, { merge: true })
}

export const deleteUserById = async (id) => {
  //TODO Tal vez porque hay que cambiar todo esto y es una mierda
  console.log(id, 'No se que hacer con esto')
}

export const getActiveUser = async () => {
  const currentUser = FirebaseAuth.currentUser

  if (currentUser) {
    const { uid } = currentUser
    const users = await getAllUsers()
    const user = await getUserById(uid, users)

    return user
  }
}

////////////////////////////////////////////////HOSPITALES

export const loadHospitals = async () => {
  const collectionRef = collection(FirebaseDB, `hospitales`)

  const docs = await getDocs(collectionRef)

  const hospitals = []
  docs.forEach((doc) => {
    hospitals.push({ id: doc.id, ...doc.data() })
  })

  return hospitals
}

export const searchHospitalByUserId = async (userId, hospitals) => {
  const allHospitals = hospitals

  const hospitalsWithUser = allHospitals.filter((hospital) =>
    hospital.idPermitidos.includes(userId)
  )

  return hospitalsWithUser
}

export const updateHospitalWaitingPatients = async (
  hospitalId,
  waitingPatients
) => {
  const hospitalRef = doc(FirebaseDB, 'hospitales', hospitalId)
  await updateDoc(hospitalRef, {
    pacientesEnEspera: waitingPatients,
  })
}

export const searchHospitalById = async (id, hospitals) => {
  const hospital = hospitals.find((hospital) => hospital.id === id)

  return hospital
}

export const updateHospitalById = async (id, data) => {
  const hospitalRef = doc(FirebaseDB, 'hospitales', id)

  updateDoc(hospitalRef, data)
}

export const deleteHospitalById = async (id) => {
  const hospitalRef = doc(FirebaseDB, 'hospitales', id)

  await deleteDoc(hospitalRef)
}

export const createHospitalFavByUserId = async (userId, hospitalId) => {
  const favRef = collection(FirebaseDB, 'favoritos')
  const favDoc = {
    userId: userId,
    hospitalId: hospitalId,
  }
  await addDoc(favRef, favDoc)
}

export const deleteHospitalFavByUserId = async (userId, hospitalId) => {
  const favRef = collection(FirebaseDB, 'favoritos')
  const q = query(
    favRef,
    where('userId', '==', userId),
    where('hospitalId', '==', hospitalId)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref)
  })
}

export const searchHospitalFavByUserId = async (id) => {
  const q = query(
    collection(FirebaseDB, 'favoritos'),
    where('userId', '==', id)
  )
  const querySnapshot = await getDocs(q)
  const hospitals = []
  querySnapshot.forEach((doc) => {
    hospitals.push(doc.data().hospitalId)
  })
  return hospitals
}
