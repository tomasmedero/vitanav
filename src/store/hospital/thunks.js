import { FirebaseDB } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore/lite'
import {
  savingNewHospital,
  setHospitalsActive,
  setHospitals,
  submitCount,
} from './hospitalSlice'
import {
  loadHospitals,
  searchHospitalByUserId,
  updateHospitalWaitingPatients,
} from '../../firebase/providers'

export const startSaveHospital = ({ data }) => {
  return async (dispatch) => {
    dispatch(savingNewHospital())

    const hospital = { ...data }

    const collectionRef = collection(FirebaseDB, `hospitales`)

    await addDoc(collectionRef, hospital)
  }
}

export const startLoadingHospitals = () => {
  return async (dispatch) => {
    const currentHospitals = await loadHospitals()

    dispatch(setHospitals(currentHospitals))
  }
}

export const startSavingActiveHospitals = (idUser, hospitals) => {
  return async (dispatch) => {
    const activeHospital = await searchHospitalByUserId(idUser, hospitals)
    dispatch(setHospitalsActive(activeHospital))
  }
}

export const startSavingNewWaitingPatients = (hospitalId, waitingPatients) => {
  return async (dispatch) => {
    await updateHospitalWaitingPatients(hospitalId, waitingPatients)
    const countPatient = { id: hospitalId, pacientesEnEspera: waitingPatients }

    dispatch(submitCount(countPatient))
  }
}
