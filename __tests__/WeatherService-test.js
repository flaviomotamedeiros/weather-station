import { getWeatherForecast } from '../src/services/WeatherService';

const lat = -9.769580;
const lng = -35.844820;

test('service must return a json', async () => {
  const data = await getWeatherForecast(lat, lng);
  expect(data).not.toBeNull();
});

test('json must contain weather information', async () => {
  const data = await getWeatherForecast(lat, lng);
  expect(data.weather).toHaveLength(1);
});

test('json must contain wind information', async () => {
  const data = await getWeatherForecast(lat, lng);
  expect(data.wind).not.toBeNull();
});