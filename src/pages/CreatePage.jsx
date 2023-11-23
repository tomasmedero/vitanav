export const CreatePage = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre:</label>
      <input {...register('nombre')} />

      <label>Dirección:</label>
      <input {...register('direccion')} />

      <label>Teléfono:</label>
      <input {...register('telefono')} />

      <label>Especialidad:</label>
      <input {...register('especialidad')} />

      <label>Pacientes en Espera:</label>
      <input {...register('pacientesEnEspera')} />

      <input type='submit' />
    </form>
  )
}
