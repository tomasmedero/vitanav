import { FirebaseDB } from '../../firebase/config'
import { doc, setDoc } from 'firebase/firestore/lite'
import { savingNewHospital, updateHospital } from './hospitalSlice'

export const startSaveHospital = ({ data }) => {
  return async (dispatch) => {
    dispatch(savingNewHospital())

    const hospital = { ...data }

    const docRef = doc(FirebaseDB, `hospitales/datos`)

    await setDoc(docRef, hospital, { merge: true })

    dispatch(updateHospital(hospital))
  }
}
