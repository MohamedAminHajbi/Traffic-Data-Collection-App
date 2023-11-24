import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import TrafficMap from './components/trafficmap/TrafficMap';
import TrafficMapTile from './components/TrafficMapTile/TrafficMapTile';
import Map from './components/map/Map';


function App() {


  return (
    <div className="App">

    <Map/>
    <TrafficMapTile/>
    </div>
  );
}

export default App;
