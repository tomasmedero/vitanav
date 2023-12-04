import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { startLoadingHospitals } from '../store/hospital/thunks'
// TODO:
//EL Admin que puedas actualizar los pacientes en espera en tiempo real
// Falta solucion lo del estaod que no se queda guardado
//Personalizar los mensajes de error de Firebase

export const MapPage = () => {
  const customIcon = new Icon({
    iconUrl: ' /markerPosition.svg',
    iconSize: [34, 34],
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startLoadingHospitals())
  }, [dispatch])

  const { hospitals } = useSelector((state) => state.hospital)

  return (
    <div className='w-full h-full absolute top-0 left-0 z-1'>
      <MapContainer
        center={[-34.583517, -58.447984]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' />
        <ZoomControl position='bottomright' />
        {hospitals.map((hospital) => (
          <div key={hospital.id}>
            <Marker
              position={[hospital.latitud, hospital.longitud]}
              icon={customIcon}
            >
              <Popup>
                <p>
                  <span className='font-extrabold'>Nombre:</span>
                  {hospital.nombre}
                </p>
                <p>
                  <span className='font-extrabold'>Dirección:</span>
                  {hospital.direccion}
                </p>
                <p>
                  <span className='font-extrabold'>Teléfono:</span>
                  {hospital.telefono}
                </p>
                <p>
                  <span className='font-extrabold'>Especialidad:</span>
                  {hospital.especialidad}
                </p>
                <p>
                  <span className='font-extrabold text-lg'>
                    Pacientes en espera:
                  </span>
                  <span className='text-lg font-bold text-yellow-500'>
                    {hospital.pacientesEnEspera}
                  </span>
                </p>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  )
}
