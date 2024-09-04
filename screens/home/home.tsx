import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native';
import styles from './home.styles';
import {fetchGeoLocation} from '../../api/location';
import {useDispatch} from 'react-redux';
import {updateRegion} from '../../store/reducers/location/location';
import AutoCompleteGeoLocation from './auto-complete-geo-location/auto-complete-geo-location';
import LinearGradient from 'react-native-linear-gradient';
import Spacer from '../../components/spacer/spacer';
import {GOOGLE_API_KEY} from '@env';
const Home = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const getRegion = useCallback(async () => {
    const regionRes = await fetchGeoLocation({
      selectedCity: city,
      selectedCountry: country,
      apiKey: GOOGLE_API_KEY,
    });
    setRegion(regionRes);
    dispatch(updateRegion(regionRes));
  }, [city, country, dispatch]);
  useEffect(() => {
    if (city?.length > 0 && country?.length > 0) {
      getRegion();
    }
  }, [city, country, getRegion]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#192f6a', '#192f6a', 'transparent']}
        style={styles.buttons}>
        <AutoCompleteGeoLocation
          textInputProps={{cursorColor: '#FFF'}}
          inputStyle={styles.input}
          placeholder={'Select a country'}
          quaryData={{
            key: GOOGLE_API_KEY,
            types: ['country'],
          }}
          onPlaceSelected={(placeId, description) => {
            setCountry(description);
          }}
          onTextChanged={text => {
            if (text?.length === 0) {
              setCountry('');
              setCity('');
            }
          }}
        />

        <Spacer size={12} />
        {country ? (
          <AutoCompleteGeoLocation
            textInputProps={{cursorColor: '#FFF'}}
            inputStyle={styles.input}
            placeholder={'Search city'}
            onPlaceSelected={(placeId, description) => {
              setCity(description);
            }}
            quaryData={{
              key: GOOGLE_API_KEY,
              types: ['city_hall'],
            }}
          />
        ) : null}
      </LinearGradient>

      {region && (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} />
        </MapView>
      )}
    </SafeAreaView>
  );
};

export default Home;
