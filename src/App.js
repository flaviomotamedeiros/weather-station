import React, { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Map from './components/Map';

const App = () => {

  const [hasFineLocationAccess, setFineLocationAccess] = useState(false);

  useEffect(() => {
    requestFineLocation();
  }, []);

  const requestFineLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const permissionGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED){
          setFineLocationAccess(true);
        }
      } else {
        setFineLocationAccess(true);
      }
    } catch (error){
      console.warn(error);
    }
  }

  if (hasFineLocationAccess){
    return (
      <Map />
    );
  }

  return null;
}

export default App;