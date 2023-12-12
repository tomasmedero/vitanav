import { useDispatch, useSelector } from 'react-redux'
import { PatientsComponent, PatientsListComponent } from '../components'
import { useEffect } from 'react'
import { startSavingActiveHospitals } from '../store/hospital/thunks'

export const PatientsHospitalPage = () => {
  const { uid } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { hospitals, active } = useSelector((state) => state.hospital)

  useEffect(() => {
    const searchHospital = async (id, hospitals) => {
      dispatch(startSavingActiveHospitals(id, hospitals))
    }

    searchHospital(uid, hospitals)
  }, [dispatch, uid, hospitals])

  return (
    <>{active.length > 1 ? <PatientsListComponent /> : <PatientsComponent />}</>
  )
}
