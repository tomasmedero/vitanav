import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    ZoomControl,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { hospitalInfo } from "../helpers"
import { Icon } from "leaflet"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { startLoadingHospitals } from "../store/hospital/thunks"
// TODO:
// Implementar base de datos tiempo real para info de pacientes
// Implementar primera vista division de establecimiento o paciente

export const MapComponent = () => {
    const customIcon = new Icon({
        iconUrl: " /markerPosition.svg",
        iconSize: [34, 34],
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startLoadingHospitals())
    }, [])

    const { hospitals } = useSelector((state) => state.hospital)

    return (
        <div className="w-full h-full absolute top-0 left-0 z-1">
            <MapContainer
                center={[-34.583517, -58.447984]}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <ZoomControl position="bottomright" />
                {hospitals.map((hospital) => (
                    <div key={hospital.id}>
                        <Marker
                            position={[hospital.latitud, hospital.longitud]}
                            icon={customIcon}
                        >
                            <Popup>
                                <p>
                                    <span className="font-extrabold">
                                        Nombre:{" "}
                                    </span>
                                    {hospital.nombre}
                                </p>
                                <p>
                                    <span className="font-extrabold">
                                        Dirección:{" "}
                                    </span>
                                    {hospital.direccion}
                                </p>
                                <p>
                                    <span className="font-extrabold">
                                        Teléfono:{" "}
                                    </span>
                                    {hospital.telefono}
                                </p>
                                <p>
                                    <span className="font-extrabold">
                                        Especialidad:{" "}
                                    </span>
                                    {hospital.especialidad}
                                </p>
                                <p>
                                    <span className="font-extrabold text-lg">
                                        Pacientes en espera:{" "}
                                    </span>
                                    <span className="text-lg font-bold text-yellow-500">
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
