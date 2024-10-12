import {createSlice} from '@reduxjs/toolkit';
// import { persistor } from '../../app/store';

// Create Slice
const initialState = {
  value: {
    username: '',
    email: '',
    isLoggedIn: false,
    id: null,
  },
};
const adminSlice = createSlice ({
  name: 'adminData',
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.isLoggedIn = true;
      state.value.id = action.payload._id;
    },
    logoutAdmin: state => {
      state.value.username = '';
      state.value.email = '';
      state.value.isLoggedIn = false;
      state.value.id = null;
    },
  },
});

export const {loginAdmin, logoutAdmin} = adminSlice.actions;
export default adminSlice.reducer;
