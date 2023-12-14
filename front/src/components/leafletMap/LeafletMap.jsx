import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol';

const LeafletMap = ({ dataRouting }) => {
  const convertFlowSegmentData = (dataRouting) => {
    const coordinates = dataRouting?.routes[0].legs[0].points;
    const convertedCoordinates = coordinates
      ? coordinates.map((coord) => [coord.latitude, coord.longitude])
      : [];
    return convertedCoordinates;
  };

  useEffect(() => {
    const convertedCoordinates = convertFlowSegmentData(dataRouting);

    if (convertedCoordinates.length === 0) {
      // Data is not available, do not render the map
      return;
    }

    // Create a map centered at a specific location
    const map = L.map('leaflet-map').setView([37.7749, -122.4194], 13);
    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add geolocation button to the map
    L.control.locate({
    position: 'topright',
    drawCircle: true,
    follow: true,
    setView: 'untilPan',
    keepCurrentZoomLevel: true,
    markerStyle: {
      weight: 1,
      opacity: 1,
    },
    circleStyle: {
      weight: 1,
      color: '#136AEC',  // Set the color of the circle
      opacity: 0.8,
      fillOpacity: 0.4,
    },
  })
  .addTo(map)

    // Draw a polyline on the map using the route coordinates
    L.polyline(convertedCoordinates, { color: 'blue' }).addTo(map);

    // Define a custom icon for the markers
    const customIcon = new L.Icon({
      iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
      iconSize: [28],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add markers at the start and end of the route with the custom icon
    L.marker(convertedCoordinates[0], { icon: customIcon }).addTo(map);
    L.marker(convertedCoordinates[convertedCoordinates.length - 1], { icon: customIcon }).addTo(map);

    // Fit the map to the bounds of the route
    map.fitBounds(convertedCoordinates);

    // Clean up when the component unmounts
    return () => {
      map.remove();
    };
  }, [dataRouting]);

  return (
    <div>
      <div id="leaflet-map" style={{ height: '100vh' }}></div>
    </div>
  );
};

export default LeafletMap;
