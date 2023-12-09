import { Navigate, Route, Routes } from 'react-router-dom'
import { LoadingPage } from '../pages'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { UserRoutes } from './UserRoutes'
import { useEffect, useState } from 'react'

export const AppRouter = () => {
  const status = useCheckAuth()
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    getGeoLocation()
  }, [])

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  if (status === 'checking') {
    return <LoadingPage />
  }

  return (
    <>
      {status === 'autenticated' ? (
        <>
          <div>
            <Routes>
              <Route
                path='/*'
                element={<UserRoutes userLocation={userLocation} />}
              />
              <Route path='/*' element={<Navigate to='/' />} />
              <Route path='/auth/*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path='/*'
            element={<UserRoutes userLocation={userLocation} />}
          />
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      )}
    </>
  )
}
