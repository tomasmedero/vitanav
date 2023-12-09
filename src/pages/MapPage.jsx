import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { startLoadingHospitals } from '../store/hospital/thunks'
import PropTypes from 'prop-types'
import { Icon } from 'leaflet'
// TODO:
// Falta solucion lo del estado que no se queda guardado
// Que cuando crea un hospital no tenga que poner la localicazion

//Sin prioridad:
//En pacientes en espera poner un success o algo cuando actualiza la lista de espera
//Esta trayendo cualquier locacion
//Hacer que el numero de paciente en espera no tarde tanto en actualizarse
//Personalizar los mensajes de error de Firebase
//Mejorar el icono de locacion se ve muy feo
//en el mapa poner mejor lo de los pacientes en espera se ve feo

export const MapPage = ({ userLocation }) => {
  const redIcon = new Icon({
    iconUrl: ' /markerPosition.svg',
    iconSize: [34, 34],
  })

  const yellowIcon = new Icon({
    iconUrl: ' /vitanav-yellow.png',
    iconSize: [34, 34],
  })

  const blueIcon = new Icon({
    iconUrl: ' /vitanav-blue.png',
    iconSize: [34, 34],
  })

  const greenIcon = new Icon({
    iconUrl: ' /vitanav-green.png',
    iconSize: [34, 34],
  })

  const userIcon = new Icon({
    iconUrl: '/iconMyLocation.png',
    iconSize: [22, 22],
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startLoadingHospitals())
  }, [dispatch])

  const { hospitals } = useSelector((state) => state.hospital)

  return (
    <div className='w-full h-full absolute top-0 left-0 z-1'>
      <MapContainer
        center={userLocation || [-34.583517, -58.447984]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' />

        {userLocation && <Marker position={userLocation} icon={userIcon} />}
        <ZoomControl position='bottomright' />

        {hospitals.map((hospital) => {
          let icon
          if (hospital.pacientesEnEspera >= 12) {
            icon = redIcon
          } else if (hospital.pacientesEnEspera >= 6) {
            icon = yellowIcon
          } else if (hospital.pacientesEnEspera >= 2) {
            icon = blueIcon
          } else if (hospital.pacientesEnEspera >= 0) {
            icon = greenIcon
          }

          return (
            <div key={hospital.id}>
              <Marker
                position={[hospital.latitud, hospital.longitud]}
                icon={icon}
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
          )
        })}
      </MapContainer>
    </div>
  )
}

MapPage.propTypes = {
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}
