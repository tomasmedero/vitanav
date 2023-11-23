import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { FooterComponent, Navbar } from '../components'
import {
  AboutUsPage,
  AdminPage,
  CreatePage,
  HomePage,
  LoadingPage,
  MapPage,
} from '../pages'
import { useEffect, useState } from 'react'

export const AppRouter = () => {
  const location = useLocation()
  const path = location.pathname

  const [isMap, setIsMap] = useState(false)

  useEffect(() => {
    if (path === '/map') {
      setIsMap(true)
    } else {
      setIsMap(false)
    }
  }, [path])

  const status = 'checking2'
  //Nota Chapa Editar el Loading Page
  // const status = useCheckAuth()  Nota Chapa hacer que funcione
  if (status === 'checking') {
    return <LoadingPage />
  }

  return (
    <>
      <div className='relative'>
        <Navbar />
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/createHospital' element={<CreatePage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
        {!isMap && <FooterComponent />}
      </div>
    </>
  )
}
