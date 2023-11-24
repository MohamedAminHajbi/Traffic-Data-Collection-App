
import React, { useState, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import { Link } from 'react-router-dom';
import './Map.css';

function Map() {
  const mapElement = useRef();

  const [mapLongitude, setMapLongitude] = useState(null);
  const [mapLatitude, setMapLatitude] = useState(null);
  const [myLongitude, setMyLongitude] = useState(null);
  const [myLatitude, setMyLatitude] = useState(null);
  const [mapZoom, setMapZoom] = useState(1); // Adjust the initial zoom level as needed
  const [map, setMap] = useState({});
  const [fetched, setFetched] = useState(false);
  const [marker, setMarker] = useState(null);
  const [flowData, setFlowData] = useState(null);

  const [inputLongitude, setInputLongitude] = useState('');
  const [inputLatitude, setInputLatitude] = useState('');

  const handleGetInfos = async () => {
    
    // Fetch data from the TomTom Flow Segment Data API
    try {
      const response = await fetch(
        `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R&point=${inputLatitude},${inputLongitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      setFetched(true);
      const data = await response.json();
      setFlowData(data.flowSegmentData);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    let mapInstance = tt.map({
      key: 'LV0YAdniBN99sBdObDGUaPGalGmpRu4R',
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });

    const scaleControl = new tt.ScaleControl();
    mapInstance.addControl(scaleControl, 'bottom-left');

    const navControl = new tt.NavigationControl();
    mapInstance.addControl(navControl, 'top-right');

    mapInstance.on('click', (event) => {
      const { lng, lat } = event.lngLat;

      if (marker) {
        marker.remove();
      }

      const newMarker = new tt.Marker().setLngLat([lng, lat]).addTo(mapInstance);

      setMarker((prevMarker) => {
        if (prevMarker) {
          prevMarker.remove();
        }
        return newMarker;
      });

      console.log(`Clicked at coordinates: ${lng}, ${lat}`);
      setInputLatitude(lat);
      setInputLongitude(lng);
    });

    const geoControl = new tt.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    mapInstance.addControl(geoControl, 'top-left');

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      if (marker) {
        marker.remove();
      }
    };
  }, [mapLongitude, mapLatitude, mapZoom]);

  return (
    <div className="container">
      <div ref={mapElement} className="mapDiv"></div>
      <div className="infos-container">
        <form className="form-infos">
          <div className="inputs">
            <div className="input-container">
              <input
                type="text"
                name="text"
                className="input"
                placeholder="search..."
                
              />
              <span className="icon"> 
                <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </span>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="text"
                className="input"
                placeholder="Longitude"
                value={inputLongitude}
                onChange={(e) => setInputLongitude(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="number"
                name="text"
                className="input"
                placeholder="Latitude"
                value={inputLatitude}
                onChange={(e) => setInputLatitude(e.target.value)}
              />
            </div>
          </div>
          <Link className="btn" onClick={handleGetInfos}>
            Get Infos
          </Link>
        </form>

        {flowData && (
          <div className="flow-data">
            <p>Current Speed: {flowData.currentSpeed} km/h</p>
            <p>Free Flow Speed: {flowData.freeFlowSpeed} km/h</p>
            <p>Current Travel Time: {flowData.currentTravelTime} seconds</p>
            <p>Free Flow Travel Time: {flowData.freeFlowTravelTime} seconds</p>
            <p>Confidence: {flowData.confidence}</p>
            <p>Road Closure: {flowData.roadClosure ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
