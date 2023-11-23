import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import TrafficMap from './components/trafficmap/TrafficMap';
import TrafficMapTile from './components/TrafficMapTile/TrafficMapTile';
import Map from './components/Map/Map';


function App() {


  return (
    <div className="App">
    <Map/>
    </div>
  );
}

export default App;
