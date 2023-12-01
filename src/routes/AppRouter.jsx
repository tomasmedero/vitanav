import { Navigate, Route, Routes } from 'react-router-dom'

import { LoadingPage } from '../pages'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { UserRoutes } from './UserRoutes'

export const AppRouter = () => {
  const status = useCheckAuth()

  if (status === 'checking') {
    return <LoadingPage />
  }

  return (
    <>
      {status === 'autenticated' ? (
        <>
          <div>
            <Routes>
              <Route path='/*' element={<UserRoutes />} />
              <Route path='/*' element={<Navigate to='/' />} />
              <Route path='/auth/*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      )}
    </>
  )
}
