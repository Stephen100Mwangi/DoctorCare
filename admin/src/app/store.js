import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import adminReducer from '../features/admin/AdminSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const adminPersist = persistReducer (persistConfig, adminReducer);

const store = configureStore ({
  reducer: {
    adminData: adminPersist,
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__ ()
    : undefined,
});

const persistor = persistStore (store);
export {store, persistor};
