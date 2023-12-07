import { collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'

export const LoadHospitals = async () => {
  const collectionRef = collection(FirebaseDB, `hospitales`)

  const docs = await getDocs(collectionRef)

  const hospitals = []
  docs.forEach((doc) => {
    hospitals.push({ id: doc.id, ...doc.data() })
  })

  return hospitals
}

export const searchHospitalByUserId = async (userId) => {
  const collectionRef = collection(FirebaseDB, `hospitales`)
  const docs = await getDocs(collectionRef)
  const hospitals = []
  docs.forEach((doc) => {
    hospitals.push({ id: doc.id, ...doc.data() })
  })

  const hospital = hospitals.find((hospital) =>
    hospital.idPermitidos.includes(userId)
  )

  return hospital
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
