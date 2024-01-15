import axios from 'axios';
import React, { useState, useEffect } from 'react';

function FuelStations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {


const options = {
  method: 'POST',
  url: 'https://number-conversion-service.p.rapidapi.com/webservicesserver/NumberConversion.wso',
  headers: {
    'content-type': 'application/xml',
    'X-RapidAPI-Key': '337be770f6msh0993e58fecbc1e3p13ec72jsndf7500c4098b',
    'X-RapidAPI-Host': 'number-conversion-service.p.rapidapi.com'
  },
  data: '<?xml version=\'1.0\' encoding=\'utf-8\'?>\n<soap:Envelope xmlns:soap=\'http://schemas.xmlsoap.org/soap/envelope/\'>\n  <soap:Body>\n    <NumberToWords xmlns=\'http://www.dataaccess.com/webservicesserver/\'>\n      <ubiNum>4815</ubiNum>\n    </NumberToWords>\n  </soap:Body>\n</soap:Envelope>'
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Fuel Stations</h1>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>{station.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FuelStations;
