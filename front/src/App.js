import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import TrafficMap from './components/trafficmap/TrafficMap';
import TrafficMapTile from './components/TrafficMapTile/TrafficMapTile';
import Map from './components/map/Map';
import TrafficFlow from './components/trafficFlow/TrafficFlow'
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom';


function App() {


  return (
    <Router>
      <Routes>
      <Route path="/" element={<Map />} />
        
      </Routes>
    </Router>
  );
}

export default App;
