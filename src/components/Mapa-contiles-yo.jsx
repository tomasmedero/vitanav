import { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";

export const Mapa = () => {
  const geoJSONPath = `/data/geolocalization-hospitals.json`;
  const lng = -58.452091;
  const lat = -34.590214;
  const zoomLevel = 11;
  useEffect(() => {
    // Configura el mapa con tu API Key
    const interactiveMap = tt.map({
      key: "2UDrf1PlrKSI4YfiC3TGAIS32bTtGkAZ",
      container: "map", // El ID del elemento HTML donde deseas mostrar el mapa
      center: [lng, lat], // Define la ubicación inicial en [longitud, latitud]
      zoom: zoomLevel, // Define el nivel de zoom inicial
      language: "es-ES",
    });
    async function fetchTile() {
      try {
        const res = await fetch(geoJSONPath);
        const info = await res.json();
        console.log(info);
        info.features.forEach((feature) => {
          const [lng, lat] = feature.geometry.coordinates;
          new tt.Marker().setLngLat([lng, lat]).addTo(interactiveMap);
        });
      } catch (error) {
        console.error("Error haciendo el fetch", error);
      }
    }
    fetchTile();

    // Procesa el GeoJSON y agrega los puntos al mapa
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};
