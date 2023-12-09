import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { FooterComponent, Navbar, PatientsComponent } from '../components'
import PropTypes from 'prop-types'
import {
  AboutUsPage,
  HomePage,
  MapPage,
  AdminUserPage,
  AdminEditUserPage,
  CreateHospitalPage,
  PatientsHospitalPage,
  AdminHospitalsPage,
  AdminEditHospitalsPage,
  AdminPage,
} from '../pages'
import { useSelector } from 'react-redux'

export const UserRoutes = ({ userLocation }) => {
  const location = useLocation()

  const { role } = useSelector((state) => state.auth)

  const isMap = location.pathname === '/map'
  return (
    <>
      <div className='relative'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/map'
            element={<MapPage userLocation={userLocation} />}
          />
          <Route path='/about' element={<AboutUsPage />} />

          {(role === 'hospitalAdminUser' || role === 'adminUser') && (
            <>
              <Route path='/adminPatients' element={<PatientsHospitalPage />} />
              <Route
                path='/adminPatients/:id'
                element={<PatientsComponent />}
              />
            </>
          )}

          {role === 'adminUser' && (
            <>
              <Route path='/createHospital' element={<CreateHospitalPage />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='admin/hospital' element={<AdminHospitalsPage />} />
              <Route
                path='admin/hospital/:id'
                element={<AdminEditHospitalsPage />}
              />
              <Route path='admin/user' element={<AdminUserPage />} />

              <Route path='admin/user/:id' element={<AdminEditUserPage />} />
            </>
          )}

          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
        {!isMap && <FooterComponent />}
      </div>
    </>
  )
}

UserRoutes.propTypes = {
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}
