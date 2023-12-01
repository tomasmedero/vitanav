import { useForm } from 'react-hook-form'
import { startSaveHospital } from '../store/hospital/thunks'
import { useDispatch, useSelector } from 'react-redux'

export const CreatePage = () => {
  const { uid } = useSelector((state) => state.auth)

  const idAdmin = '8Lxw6b232ZgTTOK888D4ICtRm8m1'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pacientesEnEspera: 0,
      idPermitidos: uid === idAdmin ? [uid] : [uid, idAdmin],
    },
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(startSaveHospital({ data }))
    reset()
  }

  return (
    <>
      <section className='w-1/2 flex justify-center flex-col mx-auto h-[79.8vh]'>
        <h1 className='text-3xl font-bold text-center my-5'>Crear Hospital</h1>
        <h2 className='bg-orange-400 text-center'>Panel de Administración</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='p-6 space-y-4 bg-white shadow-md rounded-md'
          autoComplete='off'
        >
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Nombre:
            </label>
            <input
              {...register('nombre', {
                required: 'Este valor es requerido',
              })}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.nombre && (
              <p className='text-red-500 font-bold'>{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Dirección:
            </label>
            <input
              {...register('direccion', {
                required: 'Este valor es requerido',
              })}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.direccion && (
              <p className='text-red-500 font-bold'>
                {errors.direccion.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Latitud:
            </label>
            <input
              {...register('latitud', {
                required: 'Este valor es requerido',
              })}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.latitud && (
              <p className='text-red-500 font-bold'>{errors.latitud.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Longitud:
            </label>
            <input
              {...register('longitud', {
                required: 'Este valor es requerido',
              })}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.longitud && (
              <p className='text-red-500 font-bold'>
                {errors.longitud.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Teléfono:
            </label>
            <input
              {...register('telefono', {
                required: 'Este valor es requerido',
              })}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.telefono && (
              <p className='text-red-500 font-bold'>
                {errors.telefono.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Especialidad:
            </label>
            <input
              {...register('especialidad', {
                required: 'Este valor es requerido',
              })}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.especialidad && (
              <p className='text-red-500 font-bold'>
                {errors.especialidad.message}
              </p>
            )}
          </div>

          <div className='hidden'>
            <label className='block text-sm font-medium text-gray-700'>
              Pacientes en Espera:
            </label>
            <input
              {...register('pacientesEnEspera')}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <div className='hidden'>
            <label className='block text-sm font-medium text-gray-700'>
              Id
            </label>
            <input
              {...register('idPermitidos')}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          <input
            type='submit'
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          />
        </form>
      </section>
    </>
  )
}
