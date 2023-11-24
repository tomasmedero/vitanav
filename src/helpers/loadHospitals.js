import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'

export const LoadHospitals = async () => {
  const collectionRef = collection(FirebaseDB, `hospitales`)

  const docs = await getDocs(collectionRef)

  console.log(docs)
  const hospitals = []
  docs.forEach((doc) => {
    hospitals.push({ id: doc.id, ...doc.data() })
  })

  return hospitals
}
