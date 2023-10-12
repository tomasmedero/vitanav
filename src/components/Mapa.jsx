import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { hospitalInfo } from "../helpers";
import { Icon } from "leaflet";

export const Mapa = () => {
  const customIcon = new Icon({
    iconUrl: " /markerPosition.svg",
    iconSize: [34, 34],
  });

  return (
    <div className="max-h-100 max-w-100">
      <MapContainer
        center={[-34.617214, -58.453091]}
        zoom={13}
        scrollWheelZoom={true}
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        {hospitalInfo.map((hospital) => (
          <div key={hospital.properties.ID}>
            <Marker position={hospital.geometry.coordinates} icon={customIcon}>
              <Popup>
                <p>
                  <span className="font-extrabold">Nombre:</span>{" "}
                  {hospital.properties.NOMBRE}
                </p>
                <p>
                  <span className="font-extrabold">Dirección:</span>{" "}
                  {hospital.properties.CALLE} {hospital.properties.ALTURA}
                </p>
                <p>
                  <span className="font-extrabold">Teléfono:</span>{" "}
                  {hospital.properties.TELEFONO}
                </p>
                {hospital.properties.WEB && (
                  <p>
                    <span className="font-extrabold">Web:</span>{" "}
                    {hospital.properties.WEB}
                  </p>
                )}
                <p>
                  <span className="font-extrabold">Especialidad:</span>{" "}
                  {hospital.properties.TIPO_ESPEC}
                </p>
                <p>
                  <span className="font-extrabold">Pacientes en espera:</span>{" "}
                  81
                </p>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
};
