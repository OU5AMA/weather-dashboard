// src/components/CitySelector.jsx
import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { reverseToCity, searchPlaces } from '../api/api';
import '../styling/CitySelector.css';

function CitySelector({ setLocation }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 2) {
      const results = await searchPlaces(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (place) => {
    setLocation({ lat: place.lat, lon: place.lon, name: place.name });
    setInput('');
    setSuggestions([]);
  };

  const handleGeo = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const cityName = await reverseToCity(latitude, longitude);
      setLocation({ lat: latitude, lon: longitude, name: cityName });
    });
  };

  function LocationMarker() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const cityName = await reverseToCity(lat, lng);
        setLocation({ lat, lon: lng, name: cityName });
      },
    });
    return null;
  }

  return (
    <div className="city-selector">
      <input
        type="text"
        placeholder="Search for a city"
        value={input}
        onChange={handleInput}
      />
      <button onClick={handleGeo}>Use My Location</button>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => handleSuggestionClick(s)}>
              {s.name}
            </li>
          ))}
        </ul>
      )}

      <div className="map-container">
        <MapContainer center={[34, -6.8]} zoom={2} scrollWheelZoom={true}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default CitySelector;
