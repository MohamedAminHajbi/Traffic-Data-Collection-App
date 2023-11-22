import './Map.css';
import React, { useState, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';

function Map() {
  const mapElement = useRef();

  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapZoom, setMapZoom] = useState(10);
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    let mapInstance = tt.map({
      key: 'LV0YAdniBN99sBdObDGUaPGalGmpRu4R',
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });

    const geoControl = new tt.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    mapInstance.addControl(geoControl, 'top-left');

    const scaleControl = new tt.ScaleControl();
    mapInstance.addControl(scaleControl, 'bottom-left');

    // Add a navigation control to the map
    const navControl = new tt.NavigationControl();
    mapInstance.addControl(navControl, 'top-right');

    // Add a marker on map click
    mapInstance.on('click', (event) => {
      const { lng, lat } = event.lngLat;

      // Remove existing marker if it exists
      if (marker) {
        marker.remove();
      }

      // Add a new marker
      const newMarker = new tt.Marker().setLngLat([lng, lat]).addTo(mapInstance);

      // Set the new marker in the component state
      setMarker((prevMarker) => {
        // If there was a previous marker, remove it
        if (prevMarker) {
          prevMarker.remove();
        }
        return newMarker;
      });

      // Use the coordinates as needed (e.g., store in state or send to another API)
      console.log(`Clicked at coordinates: ${lng}, ${lat}`);
    });

    setMap(mapInstance);

    // Clean up on component unmount
    return () => {
      mapInstance.remove();
      if (marker) {
        marker.remove();
      }
    };
  }, [mapLongitude, mapLatitude, mapZoom]);

  return (
    <div className="container">
      <input
        type="text"
        name="longitude"
        value={mapLongitude}
        className="longitude"
        onChange={(e) => setMapLongitude(e.target.value)}
      />
      <div ref={mapElement} className="mapDiv"></div>
    </div>
  );
}

export default Map;