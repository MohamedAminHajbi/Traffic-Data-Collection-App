import React, { useState, useEffect } from 'react';

const TrafficMapTile = () => {
  const [tileUrl, setTileUrl] = useState('');

  useEffect(() => {
    const API_KEY = 'LV0YAdniBN99sBdObDGUaPGalGmpRu4R'; // Replace with your actual TomTom API key
    const tileEndpoint = 'https://api.tomtom.com/traffic/map/4/tile/flow/absolute/12/2044/1360.png';

    // Fetch the traffic map tile
    const fetchTile = async () => {
      try {
        const response = await fetch(`${tileEndpoint}?key=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setTileUrl(url);
      } catch (error) {
        console.error('Error fetching traffic map tile:', error);
      }
    };

    fetchTile();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h2>Traffic Map Tile</h2>
      {tileUrl && <img src={tileUrl} alt="Traffic Map Tile" />}
    </div>
  );
};

export default TrafficMapTile;
