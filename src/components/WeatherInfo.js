import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import { getWeatherForecast } from '../services/WeatherService';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const WeatherInfo = (props) => {

  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState(null);
  const [forecastUrl, setForecastUrl] = useState(null);
  const [date, setDate] = useState(new Date())

  const OW_IMG_URL = 'https://openweathermap.org/img/wn/';

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    update();
  }, [props]);

  const update = () => {
    setLoading(true);
    setDate(new Date());
    getWeatherForecast(props.lat, props.lng).then(data => {
      setForecastData(data);
      setForecastUrl(`${OW_IMG_URL}${data.weather[0].icon}@2x.png`);
      setLoading(false);
    });
  }

  if (!loading) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.cityTimeContainer}>
          <Text style={styles.descriptionText}>{forecastData.name}  |  {date.getHours() + ':' + date.getMinutes()}</Text>
          <TouchableOpacity style={styles.updateButton} onPress={update}>
            <Icon name="refresh" size={16} color="#FFF" style={{ paddingTop: 1 }} />
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columnsContainer}>
          <View style={[styles.infoContainer, { flex: 4 }]}>
            <Icon style={[styles.icon, { transform: [{ rotate: (forecastData.wind.deg + 90) + 'deg' }] }]}
              name="arrow-circle-o-right" size={36} color="#FFF" />
            <Text style={styles.descriptionText}>Wind</Text>
            <Text style={styles.descriptionText}>{parseInt(forecastData.wind.speed * 3.6) + ' Km/h'}</Text>
          </View>
          <View style={[styles.infoContainer, { flex: 4 }]}>
            <Image source={{ uri: forecastUrl, width: 70, height: 70 }}></Image>
            <Text style={styles.descriptionText}>{forecastData.weather[0].main}</Text>
            <Text style={styles.descriptionText}>{forecastData.weather[0].description}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (<ActivityIndicator style={styles.loadingIcon} size="large" color="#fff" />);
  }

}

const styles = StyleSheet.create({
  columnsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  infoContainer: {
    backgroundColor: '#808B96',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 2,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    bordeTopWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 12
  },
  descriptionText: {
    fontWeight: 'bold',
    color: '#FFF'
  },
  icon: {
    padding: 16,
    paddingTop: 10
  },
  loadingIcon: {
    flex: 1, backgroundColor: '#808B96'
  },
  cityTimeContainer: {
    padding: 8,
    backgroundColor: '#808B96',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  updateButton: {
    flexDirection: 'row',
    backgroundColor: '#38B137',
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 8,
  },
  updateButtonText: {
    color: '#fff', 
    paddingLeft: 6, 
    fontWeight: 'bold'
  }
});

export default WeatherInfo;