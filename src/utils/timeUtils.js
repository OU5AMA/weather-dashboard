// src/utils/timeUtils.js

/**
 * Determines if it's currently daytime at the location.
 * @param {number} currentTime - Unix timestamp of current time (UTC).
 * @param {number} sunrise - Unix timestamp of sunrise (UTC).
 * @param {number} sunset - Unix timestamp of sunset (UTC).
 * @returns {boolean} True if day, false if night.
 */
export function isDaytime(currentTime, sunrise, sunset) {
  return currentTime >= sunrise && currentTime < sunset;
}

/**
 * Returns a theme string based on time of day and weather description.
 * @param {Object} weather - Weather data from the API.
 * @returns {string} Theme name: 'day-clear', 'day-cloudy', 'night-clear', 'night-cloudy', etc.
 */
export function determineTheme(weather) {
  const currentTime = weather.dt;
  const { sunrise, sunset } = weather.sys;
  const description = weather.weather[0]?.description?.toLowerCase() || '';

  const day = isDaytime(currentTime, sunrise, sunset);

  let condition = 'clear';

  if (description.includes('cloud') || description.includes('overcast')) {
    condition = 'cloudy';
  } else if (description.includes('rain')) {
    condition = 'rainy';
  } else if (description.includes('snow')) {
    condition = 'snowy';
  } else if (description.includes('wind')) {
    condition = 'windy';
  }

  return `${day ? 'day' : 'night'}-${condition}`;
}
