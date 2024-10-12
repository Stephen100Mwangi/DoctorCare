import {createSlice} from '@reduxjs/toolkit';
// import { persistor } from '../../app/store';

// Create Slice
const initialState = {
  value: {
    username: '',
    email: '',
    isLoggedIn: false,
    id: null,
    phone: null,
    address: null,
    gender: null,
    dateOfBirth: null,
    userImage: null,
  },
};
const userSlice = createSlice ({
  name: 'patientData',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.isLoggedIn = true;
      state.value.id = action.payload.id;
    },
    logoutUser: state => {
      state.value.username = '';
      state.value.email = '';
      state.value.isLoggedIn = false;
      state.value.id = null;
    },
    updateProfile: (state, action) => {
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.isLoggedIn = true;
      state.value.id = action.payload.id;
      state.value.address = action.payload.address;
      state.value.gender = action.payload.gender;
      state.value.dateOfBirth = action.payload.address;
      state.value.userImage = action.payload.address;
      state.value.phone = action.payload.phone;
    },
  },
});

export const {loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
