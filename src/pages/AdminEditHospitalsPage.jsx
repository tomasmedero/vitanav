import { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { searchHospitalById, updateHospitalById } from '../firebase/providers'
import { useSelector } from 'react-redux'

export const AdminEditHospitalsPage = () => {
  const { id } = useParams()
  const [hospital, setHospital] = useState({})
  const navigate = useNavigate()
  const { hospitals } = useSelector((state) => state.hospital)

  const searchHospital = useCallback(async () => {
    const hospital = await searchHospitalById(id, hospitals)
    setHospital(hospital)
  }, [id, hospitals])

  useEffect(() => {
    searchHospital()
  }, [searchHospital])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    if (hospital) {
      setValue('nombre', hospital.nombre)
      setValue('direccion', hospital.direccion)
      setValue('latitud', hospital.latitud)
      setValue('longitud', hospital.longitud)
      setValue('especialidad', hospital.especialidad)
      setValue('telefono', hospital.telefono)
    }
  }, [hospital, setValue])

  const onSubmit = async (data) => {
    try {
      await updateHospitalById(id, data)
      navigate('/admin/hospital')
    } catch (error) {
      Swal.fire('Error al actualizar el hospital:', error, 'error')
    }
  }

  const onBack = async () => {
    navigate('/admin/hospital')
  }

  return (
    <div className='flex flex-col justify-center items-center mt-10 mb-10'>
      <h1 className='text-3xl font-bold text-center my-5'>Editar Hospital</h1>
      <section className='w-full md:w-1/2 flex justify-center flex-col mx-auto min-h-[79.8vh]'>
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

          <div className='flex justify-center space-x-4'>
            <input
              type='submit'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            />
            <button
              onClick={() => onBack()}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Volver
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
