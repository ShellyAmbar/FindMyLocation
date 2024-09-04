import {createSlice} from '@reduxjs/toolkit';
import LocationState from './interfaces';

const initialState: LocationState = {
  country: '',
  city: '',
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCountry(state, action) {
      state.country = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    updateRegion(state, action) {
      state.region = action.payload.region;
    },
  },
});

export const {setCountry, setCity, updateRegion} = locationSlice.actions;
export default locationSlice.reducer;
