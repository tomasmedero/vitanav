import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { FooterComponent, Navbar } from '../components'
import PropTypes from 'prop-types'

import {
  AboutUsPage,
  AdminHospitalPage,
  HomePage,
  MapPage,
  AdminUserPage,
  AdminEditUserPage,
  CreateHospitalPage,
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
            <Route path='/admin' element={<AdminHospitalPage />} />
          )}

          {role === 'adminUser' && (
            <>
              <Route path='/createHospital' element={<CreateHospitalPage />} />
              <Route path='/adminUser' element={<AdminUserPage />} />
              <Route path='/adminUser/:id' element={<AdminEditUserPage />} />
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
