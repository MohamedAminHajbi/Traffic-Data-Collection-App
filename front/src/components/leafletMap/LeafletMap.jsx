import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ flowData }) => {
  const convertFlowSegmentData = (flowData) => {
    const coordinates = flowData?.flowSegmentData?.coordinates?.coordinate;
    const convertedCoordinates = coordinates
      ? coordinates.map((coord) => [coord.latitude, coord.longitude])
      : [];
    return convertedCoordinates;
  };

  useEffect(() => {
    const convertedCoordinates = convertFlowSegmentData(flowData);

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

    // Draw a polyline on the map using the route coordinates
    L.polyline(convertedCoordinates, { color: 'blue' }).addTo(map);

    // Add markers at the start and end of the route
    L.marker(convertedCoordinates[0]).addTo(map);
    L.marker(convertedCoordinates[convertedCoordinates.length - 1]).addTo(map);

    // Fit the map to the bounds of the route
    map.fitBounds(convertedCoordinates);

    // Clean up when the component unmounts
    return () => {
      map.remove();
    };
  }, [flowData
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  ]);

  return (
    <div>
      <div id="leaflet-map" style={{ height: '500px' }}></div>
    </div>
  );
};

export default LeafletMap;
