import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FuelPrices = () => {
  const [fuelPrices, setFuelPrices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8000/fuel-service?wsdl';

      // Construct SOAP envelope
      const soapEnvelope = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" \
    xmlns:web="http://example.com/fuel"> \
    <soapenv:Header/> \
    <soapenv:Body> \
      <web:getFuelPricesRequest/> \
    </soapenv:Body> \
  </soapenv:Envelope>`;


      try {
        const response = await axios.post(url, soapEnvelope, {
          headers: {
            'Content-Type': 'text/xml',
          },
        });
      
        if (response && response.data) {
          // Parse the XML response
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      
          // Check if the fuelPrices element exists
          const fuelPricesElement = xmlDoc.getElementsByTagName('fuelPrices')[0];
      
          if (fuelPricesElement) {
            // Extract data from the XML response
            const fuelPricesData = fuelPricesElement.textContent;
      
            // Assuming fuelPricesData is an array, you might need to adjust this based on your XML structure
            setFuelPrices(fuelPricesData.split(',')); // Split the data into an array
            console.log('Received XML Response:', response.data);
          } else {
            console.error('Missing fuelPrices element in the XML response:', response.data);
          }
        } else {
          console.error('Empty or undefined response:', response);
        }
      } catch (error) {
        console.error('SOAP request error:', error.response ? error.response.data : error.message);
      }
      
      
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <div>
      {fuelPrices ? (
        <ul>
          {fuelPrices.map((price, index) => (
            <li key={index}>{price}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FuelPrices;
