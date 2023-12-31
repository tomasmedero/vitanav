import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../store/auth/thunks'
import { startLogoutUserActive } from '../store/users/thunks'

export const Navbar = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdownProfile = () => {
    setIsOpenProfile(!isOpenProfile)
  }
  const closeDropdownProfile = () => {
    setIsOpenProfile(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdownProfile()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const dispatch = useDispatch()

  const { status, displayName } = useSelector((state) => state.auth)

  const {
    active: { role },
  } = useSelector((state) => state.users)

  const onLogout = async () => {
    dispatch(startLogout())
    dispatch(startLogoutUserActive())
  }

  return (
    <>
      <nav className='border-gray-200 bg-gray-300 dark:bg-gray-800 dark:border-gray-700 relative z-[999]'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <div className='flex items-center'>
            <img src='/vitanav.svg' alt='logo' width={50} />
            <Link
              className='font-bold flex items-center text-2xl dark:text-white ml-2'
              to='/'
            >
              <span className='text-vita text-3xl'>Vita</span>
              <span className='text-nav text-3xl'>Nav</span>
            </Link>
          </div>

          <div className='w-full md:flex md:w-auto' id='navbar-default'>
            <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50 text-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700'>
              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/'
                >
                  Inicio
                </NavLink>
              </li>

              {(role === 'hospitalAdminUser' || role === 'adminUser') && (
                <li>
                  <NavLink
                    className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    to='/adminPatients'
                  >
                    Admin Hospital
                  </NavLink>
                </li>
              )}

              {role === 'adminUser' && (
                <li>
                  <NavLink
                    className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    to='/admin'
                  >
                    Admin
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/map'
                >
                  Mapa
                </NavLink>
              </li>
              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/hospitals'
                >
                  Hospitales
                </NavLink>
              </li>

              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/about'
                >
                  Sobre Nosotros
                </NavLink>
              </li>
            </ul>
          </div>

          {status === 'autenticated' ? (
            <>
              <div className='flex items-center justify-end'>
                <p className='text-right text-blue-500 font-bold'>
                  {capitalizeFirstLetter(displayName)}
                </p>
                <div
                  className='relative inline-block text-left ml-3'
                  ref={dropdownRef}
                >
                  <div>
                    <button
                      onClick={toggleDropdownProfile}
                      className=' flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300'
                    >
                      <img
                        className='w-8 h-8 rounded-full'
                        src='/default-avatar.png'
                        alt='Avatar'
                      />
                    </button>
                  </div>

                  {isOpenProfile && (
                    <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                      {/* <div
                    className='py-1'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                  >
                    <a
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      Perfil
                    </a>
                  </div> */}

                      <div
                        className='py-1'
                        role='menu'
                        aria-orientation='vertical'
                        aria-labelledby='options-menu'
                      >
                        <a
                          onClick={onLogout}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          role='menuitem'
                        >
                          Salir
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Link to='/auth/login'>
              <button className='mt-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                Ingresar
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}
