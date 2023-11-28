
import React, { useState, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import { Link , useNavigate } from 'react-router-dom';
import './Map.css';

function Map() {
  const mapElement = useRef();
  const navigate = useNavigate();
  const [myLongitude, setMyLongitude] = useState(null);
  const [myLatitude, setMyLatitude] = useState(null);
  const [mapZoom, setMapZoom] = useState(1); // Adjust the initial zoom level as needed
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);
  const [flowData, setFlowData] = useState(null);
  const [roadCordinates, setRoadCordinates] = useState([]);
  const [inputLongitude, setInputLongitude] = useState('');
  const [inputLatitude, setInputLatitude] = useState('');

  const convertFlowSegmentData = (flowData) => {
    const coordinates = flowData.coordinates.coordinate;
    const convertedCoordinates = coordinates.map(coord => [coord.latitude, coord.longitude]);
    return convertedCoordinates;
  };
  const handleGetInfos = async () => {
    try {
      // Fetch data from the TomTom Flow Segment Data API
      const response = await fetch(
        `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R&point=${inputLatitude},${inputLongitude}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFlowData(data);
      // Save data to local storage
      localStorage.setItem('flowData', JSON.stringify(data));
      const convertedCoordinates = convertFlowSegmentData(data);
      setRoadCordinates(convertedCoordinates);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    let mapInstance = tt.map({
      key: 'LV0YAdniBN99sBdObDGUaPGalGmpRu4R',
      container: mapElement.current,
      center: [inputLatitude || 0, inputLongitude || 0],
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
    geoControl.on('geolocate', (event) => {
      console.log('Geolocate event:', event);
    
      // Now, check the console output and determine the correct way to access latitude and longitude.
      // Update the code accordingly.
      const coords = event.coords;
      const lat = coords.latitude;
      const lng = coords.longitude;
      console.log(coords);
      console.log(`Current location: ${lat}, ${lng}`);
      setMyLongitude(lng);
      setMyLatitude(lat);
    });
    
    mapInstance.addControl(geoControl, 'top-left');

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      if (marker) {
        marker.remove();
      }
    };
  }, []);

  return (
    <div className="container">
      <div ref={mapElement} className="mapDiv"></div>
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
          <Link to="/flowData" className="btn" onClick={handleGetInfos}>
            Get Infos
          </Link>
        </form>
      <div className="infos-container">
        {flowData && (
        <div class="card">
            <p><span>Current Speed</span><div className='detail'>{flowData.currentSpeed} km/h</div></p>
            <p><span>Free Flow Speed</span><div className='detail'>{flowData.freeFlowSpeed} km/h</div></p>
            <p><span>Current Travel Time</span><div className='detail'>{flowData.currentTravelTime} seconds</div></p>
            <p><span>Free Flow Travel Time</span><div className='detail'>{flowData.freeFlowTravelTime} seconds</div></p>
            <p><span>Confidence</span><div className='detail'>{flowData.confidence}</div></p>
            <p><span>Road Closure</span><div className='detail'>{flowData.roadClosure ? 'Yes' : 'No'}</div></p>
        </div>
)}
        
          
      </div>
    </div>
  );
}

export default Map;