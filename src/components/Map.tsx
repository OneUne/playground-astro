import React, { useEffect } from "react";

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: Location[];
}

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  useEffect(() => {
    const googleMapsApiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = function () {
      const mapElement = document.getElementById("map");
      if (!mapElement) {
        console.error("Map element not found");
        return;
      }

      const map = new google.maps.Map(mapElement, {
        zoom: 2,
        center: { lat: 0, lng: 0 },
      });

      locations.forEach((location) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
        });

        marker.addListener("click", () => {
          map.setCenter(marker.position!!);
        });
      });
    };

    return () => {
      script.remove();
    };
  }, [locations]);

  return <div id="map" className="w-full h-96"></div>;
};

export default MapComponent;
