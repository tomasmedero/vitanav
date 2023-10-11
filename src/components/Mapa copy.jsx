import { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";

export const Mapa = () => {
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
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};
