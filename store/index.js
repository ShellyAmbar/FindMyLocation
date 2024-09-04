import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers'; // Import your root reducer
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// Configure persist reducer
const persistConfig = {
  key: 'root', // Key to save the persisted data under
  storage: AsyncStorage, // Storage engine
  //   whitelist: ['someReducer'], // Optionally, specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true, // Enable thunk middleware
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
