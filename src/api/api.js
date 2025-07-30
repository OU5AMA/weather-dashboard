import axios from 'axios';


const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export async function reverseToCity(lat, lon) {
  const res = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_KEY}`
  );

  const result = res.data.features?.[0]?.properties;
  return result.city || result.locality || result.county || null;
}

export async function searchPlaces(query) {
  const res = await axios.get(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=5&apiKey=${GEOAPIFY_KEY}`
  );

  return res.data.features.map((feature) => ({
    name: feature.properties.city || feature.properties.name,
    lat: feature.properties.lat,
    lon: feature.properties.lon,
  }));
}

// src/api/api.js

// src/api.js
export async function fetchWeather(lat, lon) {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    },
  });
  console.log('Weather data:', res.data);

  return res.data;
}



export async function forwardToCoords(cityName) {
  const res = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
    params: {
      text: cityName,
      apiKey: GEOAPIFY_KEY,
    },
  });

  if (res.data.features.length === 0) throw new Error('No results');
  const { lat, lon } = res.data.features[0].properties;
  return { lat, lon };
}

async function getLocalTime(lat, lon) {
  const res = await axios.get('https://api.geoapify.com/v1/timezone', {
    params: {
      lat,
      lon,
      apiKey: GEOAPIFY_KEY,
    },
  });
  // Example response contains: res.data.time, res.data.offset_STD_seconds, res.data.timezone_name
  return res.data.time; // ISO 8601 string
}

