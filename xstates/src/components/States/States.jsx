import React, { useEffect, useState } from 'react';
import axios from 'axios';

const States = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isCitySelected, setIsCitySelected] = useState(false);

  useEffect(() => {
    // Fetch countries on component mount
    axios.get('https://crio-location-selector.onrender.com/countries')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states when a country is selected
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => setStates(response.data))
        .catch(error => console.error('Error fetching states:', error));
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities when a state is selected
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error fetching cities:', error));
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setIsCitySelected(true);
  };

  return (
    <div>
      <h2>Select Location</h2>
      <div>
        {/* <label>Select Country: </label> */}
        <select  value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        {/* <label>Select State: </label> */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div>
        {/* <label>Select City: </label> */}
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div>
        {isCitySelected && (
          <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
        )}
      </div>
    </div>
  );
};

export default States;
