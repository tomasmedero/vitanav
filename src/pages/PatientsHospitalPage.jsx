import { useDispatch, useSelector } from 'react-redux'
import { PatientsComponent, PatientsListComponent } from '../components'
import { useEffect } from 'react'
import { startSavingActiveHospitals } from '../store/hospital/thunks'

export const PatientsHospitalPage = () => {
  const { uid } = useSelector((state) => state.auth)
  const { active } = useSelector((state) => state.hospital)
  const dispatch = useDispatch()

  useEffect(() => {
    const searchHospital = async (id) => {
      dispatch(startSavingActiveHospitals(id))
    }

    searchHospital(uid)
  }, [dispatch, uid])

  return (
    <>{active.length > 1 ? <PatientsListComponent /> : <PatientsComponent />}</>
  )
}
