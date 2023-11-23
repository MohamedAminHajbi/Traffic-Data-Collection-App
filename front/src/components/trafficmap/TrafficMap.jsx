// TrafficMap component
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TrafficMap = ({ incidents }) => {
  const mapCenter = [52.3716625745, 4.8905708978]; // Set the initial map center

  // Create a GeoJSON feature collection object
  const geoJsonData = {
    type: 'FeatureCollection',
    features: incidents,
  };

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Check if incidents and coordinates are defined before rendering GeoJSON */}
      {incidents &&
        incidents.length &&
        incidents.map((incident, index) => (
          incident.geometry && incident.geometry.coordinates ? (
            <GeoJSON key={index} data={incident} />
          ) : null
        ))}
    </MapContainer>
  );
};

export default TrafficMap;
