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
const doctorSlice = createSlice ({
  name: 'doctorData',
  initialState,
  reducers: {
    loginDoctor: (state, action) => {
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.isLoggedIn = true;
      state.value.id = action.payload._id;
    },
    logoutDoctor: state => {
      state.value.username = '';
      state.value.email = '';
      state.value.isLoggedIn = false;
      state.value.id = null;
    },
  },
});

export const {loginDoctor, logoutDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;
