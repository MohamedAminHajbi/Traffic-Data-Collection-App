import './App.css';
import React from 'react';
import Map from './components/map/Map';
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import ReportFrom from './components/ReportForm/ReportForm';
import FuelPrices from './components/FuelPrices/FuelPrices';
import Weather from './components/Weather/Weather';
import Feedback from './components/FeddBack/FeedBack';
import Success from './components/Success/Success';
import FuelPricesComponent from './components/FuelPrices/FuelPricesComponent';



function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/success" element={<Success/>} />
      <Route path="/fuelprices" element={<FuelPricesComponent/>} />
      <Route path="/form" element={<Feedback/>} />
      <Route path="/map" element={<Map/>} />
      <Route path="/fuel" element={<FuelPrices/>} />
      <Route path="/weather" element={<Weather/>} />
      <Route path="/feedback" element={<ReportFrom/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
