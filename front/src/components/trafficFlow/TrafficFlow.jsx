import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Assuming you're using Leaflet for mapping

const TomTomMap = () => {
  const [flowData, setFlowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R&point=52.41072,4.84239'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setFlowData(data.flowSegmentData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Assuming you have a Leaflet map container with id 'mapid'
  useEffect(() => {
    if (flowData) {
      const coordinates = flowData.coordinates.coordinate;
      const map = L.map('mapid').setView([coordinates[0].latitude, coordinates[0].longitude], 15);

      // Add a tile layer (you may need to adjust the tile URL based on your needs)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Draw a polyline on the map using the coordinates from the API response
      const polyline = L.polyline(coordinates.map(coord => [coord.latitude, coord.longitude]), {
        color: 'red',
      }).addTo(map);

      // Add markers for start and end points
      L.marker([coordinates[0].latitude, coordinates[0].longitude]).addTo(map).bindPopup('Start Point');
      L.marker([coordinates[coordinates.length - 1].latitude, coordinates[coordinates.length - 1].longitude])
        .addTo(map)
        .bindPopup('End Point');

      // Add information about flow data as popups
      polyline.bindPopup(`
        <div>
          <p>Current Speed: ${flowData.currentSpeed} km/h</p>
          <p>Free Flow Speed: ${flowData.freeFlowSpeed} km/h</p>
          <p>Current Travel Time: ${flowData.currentTravelTime} seconds</p>
          <p>Free Flow Travel Time: ${flowData.freeFlowTravelTime} seconds</p>
          <p>Confidence: ${flowData.confidence}</p>
          <p>Road Closure: ${flowData.roadClosure ? 'Yes' : 'No'}</p>
        </div>
      `);
    }
  }, [flowData]);

  return <div id="mapid" style={{ height: '500px' }}></div>;
};

export default TomTomMap;
