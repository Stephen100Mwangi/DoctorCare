import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '../features/patient/patientSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const patientPersist = persistReducer (persistConfig, userReducer);
  
const store = configureStore ({
  reducer: {
    patientData: patientPersist,
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__ ()
    : undefined,
});

const persistor = persistStore (store);
export {store, persistor};
