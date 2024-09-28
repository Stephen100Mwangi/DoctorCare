import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '../features/visitor/visitorSlice.js';
import adminReducer from '../features/admin/AdminSlice.js';
import doctorReducer from '../features/doctor/DoctorSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const patientPersist = persistReducer (persistConfig, userReducer);
const adminPersist = persistReducer (persistConfig, adminReducer);
const doctorPersist = persistReducer (persistConfig, doctorReducer);

const store = configureStore ({
  reducer: {
    patientData: patientPersist,
    adminData: adminPersist,
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
