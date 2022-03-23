import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Map = (props) => {

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setLat(props.lat);
    setLng(props.lng);
    const localMarkers = [
      { id: 1, coordinate: { latitude: props.lat, longitude: props.lng } },
    ];
    setMarkers(localMarkers);
  }, []);

  const click = (e) => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    props.updateLatLng(lat, lng);
    setLat(lat);
    setLng(lng);
    const localMarkers = [
      { id: 1, coordinate: { latitude: lat, longitude: lng } },
    ];
    setMarkers(localMarkers);
  }

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        followsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={(e) => click(e)}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {markers.map((item) => {
          return (
            <Marker style={styles.markerContainer} key={`test-${item.id}`} coordinate={item.coordinate} pinColor={"purple"}>
              <View style={styles.markerTextContainer}>
                <Text style={styles.markerText}>Forecast Location</Text>
              </View>
              <Image source={{uri: 'http://maps.google.com/mapfiles/ms/icons/blue.png'}} style={{width: 32, height: 32}} />
            </Marker> 
          );
        })}
      </MapView>
    </View>
  );
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
  markerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerTextContainer: {
    backgroundColor: '#fff',
    borderColor: '#38B137',
    borderWidth: 2,
    padding: 4,
    marginBottom: 4,
    borderRadius: 8,
  },
  markerText: {
    fontWeight: 'bold',
  }
});

export default Map;