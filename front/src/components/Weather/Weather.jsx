import React, { useState, useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import './Weather.css';
import '../map/Map.css';

const Weather = () => {
  const mapElement = useRef();
  const [location, setLocation] = useState('Paris');
  const [showAqi, setShowAqi] = useState(false);
  const [fetchCond, setFetchCond] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [modal, setModal] = useState(false);
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);

  const toggleFetch = () => {
    setFetchCond((prevValue) => !prevValue);
    console.log(fetchCond);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    let mapInstance = tt.map({
      key: 'LV0YAdniBN99sBdObDGUaPGalGmpRu4R',
      container: mapElement.current,
      center: [0, 0],
      zoom: 2,
    });

    const scaleControl = new tt.ScaleControl();
    mapInstance.addControl(scaleControl, 'bottom-left');

    const navControl = new tt.NavigationControl();
    mapInstance.addControl(navControl, 'top-right');

    setMap(mapInstance);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=7b4d9728154f479a90d204002231312&q=${location}&aqi=${
          showAqi ? 'yes' : 'no'
        }`
      );
      if (!response.ok || response.status < 200) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (map && data.location) {
        const { lat, lon } = data.location;
        if (!marker) {
          // Create a new marker if it doesn't exist
          const newMarker = new tt.Marker().setLngLat([lon, lat]).addTo(map);
          setMarker(newMarker);
        } else {
          // Update the existing marker's position
          marker.setLngLat([lon, lat]);
        }
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toggleModal();
    }
  };

  useEffect(() => {
    if (fetchCond) {
      fetchData();
    }
  }, [fetchCond]);

  return (
    <div className="weatherContainer">
      <div className="mapweather">
        <div ref={mapElement} className="mapDivWeather"></div>
      </div>

      <div className="weather-info">
        <div class="card">
          <p class="heading">Weather Information for {weatherData?.location?.name}</p>
          <div className="weatherInfo">
            <label className="location">
              LOCATION:
              <input
                type="text"
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ marginLeft: '20px' }}
              />
            </label>
            <label class="containerCheck weatherInfo">
              <label className="showAQI">SHOW AQI:</label>
              <input type="checkbox" checked={showAqi} onChange={() => setShowAqi(!showAqi)} />
              <svg viewBox="0 0 64 64" height="2em" width="2em">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938"
                  class="path"
                ></path>
              </svg>
            </label>
            <button
              className="btncustom mybtn"
              onClick={(e) => {
                e.preventDefault();
                toggleFetch();
              }}
              style={{ zIndex: '55' }}
            >
              Get Routing
            </button>
          </div>
        </div>
        {weatherData && (
          <div className="table">
            <div className="filter"></div>
            <table>
              <tr>
                <th>Temperature:</th>
                <th>Condition:</th>
                <th>Wind:</th>
                <th>Pressure:</th>
                <th>Humidity:</th>
              </tr>
              <tr>
                <td>
                  {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
                </td>
                <td>{weatherData.current.condition.text}</td>
                <td>
                  {weatherData.current.wind_kph} km/h from {weatherData.current.wind_dir}
                </td>
                <td>{weatherData.current.pressure_mb} mb</td>
                <td>{weatherData.current.humidity}%</td>
              </tr>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <div className="modalcard">
          <div className="overlaycard"></div>
          <div className="modal-content-card">
            <h2>Error</h2>
            <p>We are sorry that we don't have weather data in this location!</p>
            <button
              className="btncustom"
              onClick={(e) => {
                e.preventDefault();
                toggleModal();
              }}
            >
              Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
