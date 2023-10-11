import { Navigate, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { Navbar } from '../components'
import { AboutUs } from '../pages'

export const AppRouter = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/*' element={<App />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
