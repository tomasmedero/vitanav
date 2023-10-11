import { Navigate, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { Navbar } from '../components'

export const AppRouter = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/*' element={<App />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
