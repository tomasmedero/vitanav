import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { FooterComponent, Navbar } from '../components'
import {
  AboutUsPage,
  AdminPage,
  CreatePage,
  HomePage,
  MapPage,
  AdminUserPage,
} from '../pages'
import { useSelector } from 'react-redux'

export const UserRoutes = () => {
  const location = useLocation()

  const { role } = useSelector((state) => state.auth)

  const isMap = location.pathname === '/map'
  return (
    <>
      <div className='relative'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/about' element={<AboutUsPage />} />

          {(role === 'hospitalAdminUser' || role === 'adminUser') && (
            <Route path='/admin' element={<AdminPage />} />
          )}

          {role === 'adminUser' && (
            <>
              <Route path='/createHospital' element={<CreatePage />} />
              <Route path='/adminUser' element={<AdminUserPage />} />
            </>
          )}

          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
        {!isMap && <FooterComponent />}
      </div>
    </>
  )
}
