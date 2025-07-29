import { useEffect } from 'react';
import { fetchWeather } from '../api/api';



export default function WeatherCard({ coords, city, weatherData, setWeatherData }) {
  useEffect(() => {
    if (coords) {
      (async () => {
        try {
          const data = await fetchWeather(coords.lat, coords.lon);
          setWeatherData(data);
        } catch (err) {
          console.error('Error fetching weather:', err);
        }
      })();
    }
  }, [coords]);

  if (!weatherData) return null;

  return (
    <div className="weather-card" style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Weather in {city || weatherData.name}</h2>
      <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
      <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°C</p>
      <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
      <p><strong>Condition:</strong> {weatherData.weather[0].description}</p>
    </div>
  );
}
