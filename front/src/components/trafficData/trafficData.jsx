import React, { useState, useEffect } from 'react';
import TrafficMap from '../trafficmap/TrafficMap'; // Replace with the correct path

const TrafficData = () => {
  const [incidentData, setIncidentData] = useState([]);
  const API_KEY = 'LV0YAdniBN99sBdObDGUaPGalGmpRu4R'; // Replace with your actual TomTom API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bbox = '4.8854592519716675,52.36934334773164,4.897883244144765,52.37496348620152';
        const response = await fetch(
          `https://api.tomtom.com/traffic/services/5/incidentDetails?bbox=${bbox}&fields={incidents{type,geometry{type,coordinates},properties{iconCategory}}}&language=en-GB&categoryFilter=0,1,2,3,4,5,6,7,8,9,10,11,14&timeValidityFilter=present&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setIncidentData(data.incidents);
      } catch (error) {
        console.error('Error fetching traffic incident data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h2>Traffic Incidents</h2>
      <TrafficMap incidents={incidentData} />
    </div>
  );
};

export default TrafficData;
