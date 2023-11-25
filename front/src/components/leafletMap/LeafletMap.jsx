import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ routeCoordinates }) => {
  useEffect(() => {
    // Create a map centered at a specific location
    const map = L.map('leaflet-map').setView([37.7749, -122.4194], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Example coordinates for a route
    const routeCoordinates = [
      [39.492368857312186, 8.966464541099981],
  [39.491994565480063, 8.967005727063281],
  [39.491846452849778, 8.967237046340159],
  [39.491731542361016, 8.967398588099911],
  [39.491691086391484, 8.967457023560399],
  [39.491452124312083, 8.967757216895109],
    ]

    // Draw a polyline on the map using the route coordinates
    L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);

    // Add markers at the start and end of the route
    L.marker(routeCoordinates[0]).addTo(map);
    L.marker(routeCoordinates[routeCoordinates.length - 1]).addTo(map);

    // Fit the map to the bounds of the route
    map.fitBounds(routeCoordinates);

    // Clean up when the component unmounts
    return () => {
      map.remove();
    };
  }, []);

  return <div id="leaflet-map" style={{ height: '500px' }}></div>;
};

export default LeafletMap;
