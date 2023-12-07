export const FooterComponent = () => {
  return (
    <footer className='bg-orange-950 w-full py-2 md:py-4'>
      <div>
        <div className='flex justify-center'>
          <ul className='text-white text-center text-sm md:text-base mb-3'>
            <li>Términos y condiciones de uso</li>
            <li>Leandro Martín Fernández Chapotot</li>
          </ul>
        </div>
        <p className='text-white text-center text-sm md:text-base'>
          2023 &copy; Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
