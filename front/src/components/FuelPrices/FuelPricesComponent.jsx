import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FuelPricesComponent = () => {
  const [fuelPrices, setFuelPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a SOAP request to the API
        const response = await axios.post(
          'http://localhost:3001/fuel-service',
          `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" \
              xmlns:web="http://example.com/fuel"> \
            <soapenv:Header/> \
            <soapenv:Body> \
              <web:getFuelPricesRequest/> \
            </soapenv:Body> \
          </soapenv:Envelope>`,
          {
            headers: {
              'Content-Type': 'text/xml',
            },
          }
        );

        // Extract the fuel prices from the response
        const fuelPricesData =
          response.data &&
          response.data['soap:Envelope']['soap:Body'][0]['tns:getFuelPricesResponse'][0]['fuelPrices'][0];

        // Update the state with the fetched data
        setFuelPrices(fuelPricesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <h2>Fuel Prices</h2>
      <ul>
        {fuelPrices.map((price, index) => (
          <li key={index}>{price /* Assuming the fuel prices are simple values */}</li>
        ))}
      </ul>
    </div>
  );
};

export default FuelPricesComponent;
