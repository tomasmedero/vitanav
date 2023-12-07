import { NavLink } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
      <section className='flex flex-col md:flex-row min-h-full md:min-h-[80.7vh]'>
        <article className='w-full md:w-1/2 mx-4 md:mx-8 px-4 md:px-8'>
          <h1 className='text-3xl md:text-5xl font-bold my-5 md:my-10 mx-2 md:mx-5'>
            La ruta hacía tu bienestar
          </h1>
          <p className='text-xl md:text-2xl'>
            Descubre una nueva forma de gestionar tu atención médica con
            VitaNav.
          </p>
          <p className='text-xl md:text-2xl my-3 md:my-5'>
            Encuentra hospitales cercanos, verifica las esperas en tiempo real y
            elige la opción que mejor se adapte a tus necesidades.
          </p>
          <p className='text-xl md:text-2xl'>
            <span className='underline'>Conectividad en Salud:</span> Conéctate
            con una red de profesionales de la salud, hospitales y centros
            médicos. VitaNav te brinda la posibilidad de tomar decisiones
            respaldadas por información precisa y actualizada.
          </p>
          <NavLink
            to='/map'
            className='inline-block p-3 md:p-5 text-lg md:text-xl uppercase bg-red-600 font-bold text-white rounded-lg mt-5 md:mt-10 ml-2 md:ml-10 hover:bg-red-800 transition-all hover:p-7'
          >
            Ir al mapa de hospitales
          </NavLink>
        </article>
        <article className='w-full md:w-1/2 flex flex-row-reverse'>
          <img
            src='/girl-cellphone.png'
            alt='Chica consultando a su celular'
            className='h-full object-cover'
          />
        </article>
      </section>
    </>
  )
}
