// Map.js

import React, { useState, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import { Link, useNavigate } from 'react-router-dom';
import './Map.css';

function Map() {
  const mapElement = useRef();
  const navigate = useNavigate();
  const [myLongitude, setMyLongitude] = useState('10.155951734199805');
  const [myLatitude, setMyLatitude] = useState('36.84419289085466');
  const [mapZoom, setMapZoom] = useState(1);
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);
  const [flowData, setFlowData] = useState(null);
  const [roadCordinates, setRoadCordinates] = useState([]);
  const [inputLongitude, setInputLongitude] = useState('9.48528865750896');
  const [inputLatitude, setInputLatitude] = useState('35.03810682355535');
  const [endLng, setEndLng] = useState('');
  const [startLng, setStartLng] = useState('');
  const [endLtd, setEndLtd] = useState('');
  const [startLtd, setStartLtd] = useState('');
  const [routeData, setRouteData] = useState(null);

  const convertFlowSegmentData = (flowData) => {
    const coordinates = flowData.coordinates.coordinate;
    const convertedCoordinates = coordinates.map(coord => [coord.latitude, coord.longitude]);
    return convertedCoordinates;
  };

  const handleGetInfos = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R&point=${inputLatitude},${inputLongitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFlowData(data);
      localStorage.setItem('flowData', JSON.stringify(data));

      const convertedCoordinates = convertFlowSegmentData(data);
      setRoadCordinates(convertedCoordinates);

      navigate('/flowData');
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
      localStorage.setItem('inputLat', inputLatitude);
      localStorage.setItem('inputLng', inputLongitude);
    });

    const geoControl = new tt.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    geoControl.on('geolocate', (event) => {
      const coords = event.coords;
      const lat = coords.latitude;
      const lng = coords.longitude;
      console.log(coords);
      console.log(`Current location: ${lat}, ${lng}`);
      setMyLongitude(lng);
      setMyLatitude(lat);
      localStorage.setItem('mylat', myLatitude);
      localStorage.setItem('mylng', myLongitude);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.tomtom.com/routing/1/calculateRoute/${myLatitude},${myLongitude}:${inputLatitude},${inputLongitude}/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R`
        );
        const dataRouting = await response.json();
        setRouteData(dataRouting);

        localStorage.setItem('routeData', JSON.stringify(dataRouting));
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="mapContainer">
        <div ref={mapElement} className="mapDiv"></div>
      </div>

      <div className="rightPanel">
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
                {/* Your search icon */}
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
      </div>
    </div>
  );
}

export default Map;
