import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid, View, StyleSheet, ActivityIndicator } from 'react-native';
import Map from './components/Map';
import WeatherInfo from './components/WeatherInfo';
import Geolocation from 'react-native-geolocation-service';

const App = () => {

  const[lat, setLat] = useState(0);
  const[lng, setLng] = useState(0);
  const[loading, setLoading] = useState(true);
  const [hasFineLocationAccess, setFineLocationAccess] = useState(false);

  useEffect(() => {
    requestFineLocation();
  }, []);

  const setLatLong = () => {
    Geolocation.watchPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(position.coords)
        setLoading(false);
      },
      (error) => {
        console.warn(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const updateLatLng = (lat, lng) => {
    setLat(lat);
    setLng(lng);
  }

  const requestFineLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const permissionGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED){
          setFineLocationAccess(true);
          setLatLong();
        }
      } else {
        setFineLocationAccess(true);
        setLatLong();
      }
    } catch (error){
      console.warn(error);
    }
  }

  if (hasFineLocationAccess && !loading){
    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={{ flex: 7 }}>
          <Map lat={lat} lng={lng} updateLatLng={updateLatLng}></Map>
        </View>
        <View style={{ flex: 2 }}>
          <WeatherInfo lat={lat} lng={lng}></WeatherInfo>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.loadingIconContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingIconContainer: {
    flex: 1,
    backgroundColor: '#808B96',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;