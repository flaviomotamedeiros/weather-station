import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Map = () => {

  const[lat, setLat] = useState(0);
  const[lng, setLng] = useState(0);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    Geolocation.watchPosition(
      (position) => {
        console.log(position);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        console.warn(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  if (!loading){
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          followsUserLocation
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    );
  } else {
    return (<ActivityIndicator size="large" color="#00ff00" />);
  }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;