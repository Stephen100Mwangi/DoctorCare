import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import doctorReducer from '../features/doctor/DoctorSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const doctorPersist = persistReducer (persistConfig, doctorReducer);

const store = configureStore ({
  reducer: {
    doctorData: doctorPersist,
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__ ()
    : undefined,
});

const persistor = persistStore (store);
export {store, persistor};
