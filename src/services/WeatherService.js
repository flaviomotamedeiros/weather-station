import fetch from 'node-fetch'; 

const OW_URL = 'https://api.openweathermap.org/data/2.5/weather';
const OW_API_KEY = process.env['OPEN_WEATHER_API_KEY'];

export const getWeatherForecast = (lat, lng) => {
  return fetch(`${OW_URL}?lat=${lat}&lon=${lng}&appid=${OW_API_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}