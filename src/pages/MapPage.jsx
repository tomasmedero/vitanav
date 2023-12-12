import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import { Icon } from 'leaflet'
import { useSelector } from 'react-redux'
//TODO:
//Con prioridad:
// Poner para que las listas se puedan ordenar por las columnas

//Sin prioridad:
//En pacientes en espera poner un success o algo cuando actualiza la lista de espera
//Esta trayendo cualquier locacion
//Personalizar los mensajes de error de Firebase
//Mejorar el icono de locacion se ve muy feo
//en el mapa poner mejor lo de los pacientes en espera se ve feo
//Ver que onda con los iconos si se definen o se hace algo
//Arreglar el footer en todos lados

export const MapPage = ({ userLocation }) => {
  const { hospitals } = useSelector((state) => state.hospital)

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
