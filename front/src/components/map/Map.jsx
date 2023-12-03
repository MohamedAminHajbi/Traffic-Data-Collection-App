// Map.js

import React, { useState, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import { Link, useNavigate } from 'react-router-dom';
import './Map.css';
import LeafletMap from '../leafletMap/LeafletMap';

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
  const [inputLongitude, setInputLongitude] = useState('-3.7440826227505397');
  const [inputLatitude, setInputLatitude] = useState('40.236291071787605');
  const [endLng, setEndLng] = useState('8.704700948636685');
  const [startLng, setStartLng] = useState('10.155937110783439');
  const [endLtd, setEndLtd] = useState('36.14504712200656');
  const [startLtd, setStartLtd] = useState('36.844180988493804');
  const [routeData, setRouteData] = useState(null);
  const [showLeafletMap, setShowLeafletMap] = useState(false);
  const [pingTwoPlaces, setPingTwoPlaces] = useState(false);

  const convertFlowSegmentData = (flowData) => {
    const coordinates = flowData.coordinates.coordinate;
    const convertedCoordinates = coordinates.map(coord => [coord.latitude, coord.longitude]);
    return convertedCoordinates;
  };

  const handleGetInfos = async (e) => {
  
    try {
      const response = await fetch(
        `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R&point=${inputLatitude},${inputLongitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFlowData(data);
      setShowLeafletMap(true);

      const convertedCoordinates = convertFlowSegmentData(data);
      setRoadCordinates(convertedCoordinates);
      
      console.log("Our Data",flowData)
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
      if (pingTwoPlaces){
        
      }else{
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
      }
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
          `https://api.tomtom.com/routing/1/calculateRoute/${startLtd},${startLng}:${endLtd},${endLng}/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R`
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
      {showLeafletMap ? (
        <div>
          <div style={{ display: 'block' }}>
            <LeafletMap flowData={flowData} />
          </div>
          <div style={{ display: 'none' }} ref={mapElement} className="mapDiv"></div>
        </div>
          
        ) : (
          <div>
          <div style={{ display: 'none' }}>
            <LeafletMap flowData={flowData} />
          </div>
            <div style={{ display: 'block' }} ref={mapElement} className="mapDiv"></div>
        </div>
        )}
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
          <button className="btn" onClick={(e)=>{e.preventDefault(); handleGetInfos(); setShowLeafletMap(true);}}>
            Get Traffic
          </button>
          <button className="btn" onClick={(e)=>{e.preventDefault(); handleGetInfos(); setShowLeafletMap(true);}}>
            Get Infos
          </button>
        </form>
      </div>
    </div>
  );
}

export default Map;
