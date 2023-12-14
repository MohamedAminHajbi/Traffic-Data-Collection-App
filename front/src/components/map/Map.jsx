import React, { useState, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import { Link, useNavigate } from 'react-router-dom';
import './Map.css';
import LeafletMap from '../leafletMap/LeafletMap';

function Map() {
  const mapElement = useRef();
  const [showTomTomMap, setShowTomTomMap] = useState(true);
  const [myLongitude, setMyLongitude] = useState('10.155951734199805');
  const [myLatitude, setMyLatitude] = useState('36.84419289085466');
  const [mapZoom, setMapZoom] = useState(1);
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);
  const [flowData, setFlowData] = useState(null);
  const [roadCordinates, setRoadCordinates] = useState([]);
  const [inputLongitude, setInputLongitude] = useState('-3.7440826227505397');
  const [inputLatitude, setInputLatitude] = useState('40.236291071787605');
  const [endLng, setEndLng] = useState('-3.7440826227505397');
  const [startLng, setStartLng] = useState('10.155951734199805');
  const [endLtd, setEndLtd] = useState('40.236291071787605');
  const [startLtd, setStartLtd] = useState('36.84419289085466');
  const [routeData, setRouteData] = useState(null);
  const [showLeafletMap, setShowLeafletMap] = useState(false);
  const [pingTwoPlaces, setPingTwoPlaces] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [modal, setModal] = useState(false);
  const [routingInfo, setRoutingInfo] = useState(null);


  const toggleModal = () => {
    setModal(!modal);
  }

  const handleRefresh = () => {
    setShowTomTomMap(true);
  };


  const convertFlowSegmentData = (flowData) => {
    const coordinates = flowData.coordinates.coordinate;
    const convertedCoordinates = coordinates.map(coord => [coord.latitude, coord.longitude]);
    return convertedCoordinates;
  };

  const formatRoutingInfo = (info) => {
    const formattedInfo = { ...info };

    // Format travel time to hours and minutes
    const hours = Math.floor(formattedInfo.summary.travelTimeInSeconds / 3600);
    const minutes = Math.floor((formattedInfo.summary.travelTimeInSeconds % 3600) / 60);
    formattedInfo.summary.travelTimeInSeconds = `${hours}h ${minutes}m`;

    // Format departure and arrival times
    formattedInfo.summary.departureTime = new Date(formattedInfo.summary.departureTime).toLocaleString();
    formattedInfo.summary.arrivalTime = new Date(formattedInfo.summary.arrivalTime).toLocaleString();

    return formattedInfo;
  };

  const togglePingTwoPlaces = () => {
    setPingTwoPlaces((prevValue) => !prevValue);
  };

  const handleGetRouting = async (e) => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${startLtd},${startLng}:${endLtd},${endLng}/json?key=LV0YAdniBN99sBdObDGUaPGalGmpRu4R`
      );
  
      if (!response.ok || response.status < 200) {
        throw new Error('Failed to fetch route data');
      }
      if(response.ok){
        setShowLeafletMap(true);
      }
  
      const dataRouting = await response.json();
      setRouteData(dataRouting);
      console.log(dataRouting)
      const hours = Math.floor(dataRouting.routes[0].summary.travelTimeInSeconds / 3600);
      const minutes = Math.floor((dataRouting.routes[0].summary.travelTimeInSeconds % 3600) / 60);
      dataRouting.routes[0].summary.travelTimeInSeconds = `${hours}h ${minutes}m`;
      const arrivalTime = new Date(dataRouting.routes[0].summary.arrivalTime).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      dataRouting.routes[0].summary.arrivalTime = arrivalTime.replace(',', '');
      const departureTime = new Date(dataRouting.routes[0].summary.departureTime).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const lengthInKilometers = (dataRouting.routes[0].summary.lengthInMeters / 1000).toFixed(2);
      dataRouting.routes[0].summary.lengthInMeters = `${lengthInKilometers} km`;
      dataRouting.routes[0].summary.departureTime = departureTime.replace(',', '');
    } catch (error) {
      console.error('Error fetching route data:', error);
      toggleModal()
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
    if (pingTwoPlaces){
      mapInstance.on('click', (event) => {
        const { lng, lat } = event.lngLat;
      
        setMarkers((prevMarkers) => {
          let updatedMarkers;
      
          // If there are already two markers, remove the first one
          if (prevMarkers.length === 2) {
            prevMarkers[0].remove();
            updatedMarkers = [prevMarkers[1], new tt.Marker().setLngLat([lng, lat])];
          } else {
            // If less than two markers, add a new one
            updatedMarkers = [...prevMarkers, new tt.Marker().setLngLat([lng, lat])];
          }
      
          console.log('Markers:', updatedMarkers); // Log the current state

          updatedMarkers.forEach((marker) => {
            marker.addTo(mapInstance);
          });
          if(updatedMarkers.length===1){
            const coor1 = updatedMarkers[0].getLngLat()
            console.log(coor1);
            setStartLng(coor1.lng);
            setStartLtd(coor1.ltd);
          }
          
          
          if(updatedMarkers.length===2){
            const coor1 = updatedMarkers[0].getLngLat()
            const coor2 = updatedMarkers[1].getLngLat()
            setStartLng(coor1.lng);
            setStartLtd(coor1.lat);
            setEndLng(coor2.lng);
            setEndLtd(coor2.lat);
            
          }
          return updatedMarkers;
        });
      });
      
      
      
    }else{
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
          setEndLtd(lat);
          setEndLng(lng);

        
      });
    }

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
      setStartLng(lng)
      setStartLtd(lat)
    });

    mapInstance.addControl(geoControl, 'top-left');

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      if (marker) {
        marker.remove();
      }
      if (markers.length>0) {
        markers.forEach((m)=>{
          m.remove();
        })
      }
    };
  }, [pingTwoPlaces]);

  useEffect(() => {
    const fetchData = async () => {
      
    };

    fetchData();
  }, []);

  return (
    <div className="containermap">
      <div className="mapContainer">
      {showLeafletMap ? (
        <div>
          <div style={{ display: 'block' }}>
            <LeafletMap dataRouting={routeData} />
          </div>
          <div style={{ display: 'none' }} ref={mapElement} className="mapDiv"></div>
        </div>
        ) : (
          <div>
          <div style={{ display: 'none' }}>
            <LeafletMap dataRouting={routeData} />
          </div>
            <div style={{ display: 'block' }} ref={mapElement} className="mapDiv"></div>
        </div>
        )}
      </div>

      <div className="rightPanel">
        <div className="btns-container">
            <div className="toggle-container">
          <input type="checkbox" className="toggle-input" onClick={(e)=>togglePingTwoPlaces()}/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292 142" className="toggle">
            <path d="M71 142C31.7878 142 0 110.212 0 71C0 31.7878 31.7878 0 71 0C110.212 0 119 30 146 30C173 30 182 0 221 0C260 0 292 31.7878 292 71C292 110.212 260.212 142 221 142C181.788 142 173 112 146 112C119 112 110.212 142 71 142Z" className="toggle-background"></path>
            <rect rx="6" height="64" width="12" y="39" x="64" className="toggle-icon on"></rect>
            <path d="M221 91C232.046 91 241 82.0457 241 71C241 59.9543 232.046 51 221 51C209.954 51 201 59.9543 201 71C201 82.0457 209.954 91 221 91ZM221 103C238.673 103 253 88.6731 253 71C253 53.3269 238.673 39 221 39C203.327 39 189 53.3269 189 71C189 88.6731 203.327 103 221 103Z" fillRule="evenodd" className="toggle-icon off"></path>
            <g filter="url('#goo')">
              <rect fill="#fff" rx="29" height="58" width="116" y="42" x="13" className="toggle-circle-center"></rect>
              <rect fill="#fff" rx="58" height="114" width="114" y="14" x="14" className="toggle-circle left"></rect>
              <rect fill="#fff" rx="58" height="114" width="114" y="14" x="164" className="toggle-circle right"></rect>
            </g>
            <filter id="goo">
              <feGaussianBlur stdDeviation="10" result="blur" in="SourceGraphic"></feGaussianBlur>
              <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
            </filter>
          </svg>
        </div>
        <button type="button" className="button" onClick={(e)=>{e.preventDefault();setShowLeafletMap(false);}}>
          <span className="button__text">Refresh</span>
          <span className="button__icon"><svg className="svg" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path><path d="M0 0h48v48h-48z" fill="none"></path></svg></span>
        </button>
        </div>
      
        <form className="form-infos">
          <div className="inputs">
            {/* <div className="input-container">
              <input
                type="text"
                name="text"
                className="input"
                placeholder="search..."
              />
              <span className="icon">
               
              </span>
            </div> */}
            <div className="input-container">
            <label htmlFor="longitudeInput">Start Point Longitude:</label>
              <input
                type="number"
                name="text"
                className="input"
                placeholder="Longitude"
                value={startLng}
                onChange={(e) => setStartLng(e.target.value)}
              />
            </div>
            <div className="input-container">
            <label htmlFor="longitudeInput">Start Point Latitude:</label>
              <input
                type="number"
                name="text"
                className="input"
                placeholder="Latitude"
                value={startLtd}
                onChange={(e) => setStartLtd(e.target.value)}
              />
            </div>
          </div>
          <div className="inputs">
          <div className="input-container">
          <label htmlFor="longitudeInput">End point Longitude:</label>
              <input
                type="number"
                name="text"
                className="input"
                placeholder="Longitude"
                value={endLng}
                onChange={(e) => setEndLng(e.target.value)}
              />
            </div>
            <div className="input-container">
            <label htmlFor="longitudeInput">End Point Latitude:</label>
              <input
                type="number"
                name="text"
                className="input"
                placeholder="Latitude"
                value={endLtd}
                onChange={(e) => setEndLtd(e.target.value)}
              />
            </div>
            
          </div>
        </form>
        <button className="btncustom" onClick={(e)=>{e.preventDefault(); handleGetRouting();}}>
            Get Routing
        </button>
        {routeData && (
        <div className="table-route">
            <div className="filter"></div>
            <table>
              <tr>
                <th>Route Length:</th>
                <th>Travel Time:</th>
                <th>departure Time:</th>
                <th>arrival Time:</th>
                
              </tr>
              <tr>
                <td>
                  {routeData.routes[0].summary.lengthInMeters}
                </td>
                <td>{routeData.routes[0].summary.travelTimeInSeconds}</td>
                <td>
                {routeData.routes[0].summary.departureTime}
                </td>
                <td>{routeData.routes[0].summary.arrivalTime}</td>
                
              </tr>
            </table>
          </div>)}
      </div>
      {modal && (
        <div className="modalcard">
          <div className="overlaycard"></div>
          <div className="modal-content-card">
            <h2>Error</h2>
            <p>We are sorry that we can't find a route to this location!</p>
            <button className="btncustom" onClick={(e)=>{e.preventDefault(); toggleModal();}}>
              Return
            </button>
          </div>
      </div>
      )

      }
      
    </div>
  );
}

export default Map;
