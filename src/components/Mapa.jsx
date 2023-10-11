import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { hospitalInfo } from '../helpers'

export const Mapa = () => {
  return (
    <div className='max-h-100 max-w-100'>
      <MapContainer
        center={[-34.617214, -58.453091]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {hospitalInfo.map((hospital) => (
          <>
            <Marker position={hospital.geometry.coordinates}>
              <Popup>
                <p>
                  <span className='font-extrabold'>Nombre:</span>{' '}
                  {hospital.properties.NOMBRE}
                </p>
                <p>
                  <span className='font-extrabold'>Calle:</span>{' '}
                  {hospital.properties.CALLE} {hospital.properties.ALTURA}
                </p>
              </Popup>
            </Marker>
          </>
        ))}
      </MapContainer>
    </div>
  )
}
