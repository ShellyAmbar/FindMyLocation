import {combineReducers} from 'redux';
import LocationReducer from './location/location';

const rootReducer = combineReducers({
  location: LocationReducer,
});

export default rootReducer;
