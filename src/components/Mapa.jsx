import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { hospitalInfo } from '../helpers'
import { Icon } from 'leaflet'

export const Mapa = () => {
  const customIcon = new Icon({
    iconUrl: ' /markerPosition.png',
    iconSize: [36, 36],
  })

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
          <div key={hospital.properties.ID}>
            <Marker position={hospital.geometry.coordinates} icon={customIcon}>
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
          </div>
        ))}
      </MapContainer>
    </div>
  )
}
