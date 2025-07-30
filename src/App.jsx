import { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import MapComponent from './components/MapComponent';
import WeatherCard from './components/WeatherCard';
import { determineTheme } from './utils/timeUtils';
import './styling/theme.css';

export default function App() {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

useEffect(() => {
  if (weatherData) {
    const theme = determineTheme(weatherData);
    document.body.className = theme;
  }
}, [weatherData]);


  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Weather Dashboard</h1>
      <SearchInput setCoords={setCoords} setCity={setCity} />
      <MapComponent setCoords={setCoords} setCity={setCity} />
      <WeatherCard
        coords={coords}
        city={city}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    </div>
  );
}
