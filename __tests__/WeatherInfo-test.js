import React from 'react';
import renderer from 'react-test-renderer';
import WeatherInfo from '../src/components/WeatherInfo';

const lat = -9.769580;
const lng = -35.844820;

test('weather info renders activity indicator when loading data', () => {
  const tree = renderer.create(<WeatherInfo lat={lat} lng={lng} />).toJSON();
  expect(tree).toMatchSnapshot();
});