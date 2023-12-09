import { FirebaseDB } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore/lite'
import {
  savingNewHospital,
  setHospitalsActive,
  setHospitals,
} from './hospitalSlice'
import {
  LoadHospitals,
  searchHospitalByUserId,
} from '../../helpers/loadHospitals'

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
    const currentHospitals = await LoadHospitals()

    dispatch(setHospitals(currentHospitals))
  }
}

export const startSavingActiveHospitals = (idUser) => {
  return async (dispatch) => {
    const activeHospital = await searchHospitalByUserId(idUser)

    dispatch(setHospitalsActive(activeHospital))
  }
}
