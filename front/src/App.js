import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import TrafficMap from './components/trafficmap/TrafficMap';
import TrafficMapTile from './components/TrafficMapTile/TrafficMapTile';
import Map from './components/map/Map';
import MapDetails from './components/leafletMap/LeafletMap';
import TrafficFlow from './components/trafficFlow/TrafficFlow'
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom';
import TomTomMap from './components/leafletMap/LeafletMap';
import LeafletMap from './components/leafletMap/LeafletMap';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import ReportFrom from './components/ReportForm/ReportForm';
import FuelPrices from './components/FuelPrices/FuelPrices';
import Weather from './components/Weather/Weather';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/form" element={<ReportFrom/>} />
      <Route path="/map" element={<Map/>} />
      <Route path="/routing" element={<TrafficMap/>} />
      <Route path="/fuel" element={<FuelPrices/>} />
      <Route path="/weather" element={<Weather/>} />
      </Routes>
    </Router>
  );
}

export default App;
