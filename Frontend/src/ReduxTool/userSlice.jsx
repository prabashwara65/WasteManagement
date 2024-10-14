// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: localStorage.getItem('name') || '',
  email: localStorage.getItem('email') || '',
  address_no: localStorage.getItem('address_no') || '',
  address_street: localStorage.getItem('address_street') || '',
  address_city: localStorage.getItem('address_city') || '',
  nic: localStorage.getItem('nic') || '',
  phone: localStorage.getItem('phone') || '',
  loggedIn: localStorage.getItem('loggedIn') === 'true',
  role: localStorage.getItem('role') || ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address_no = action.payload.address_no;
      state.address_street = action.payload.address_street;
      state.address_city = action.payload.address_city;
      state.nic = action.payload.nic;
      state.phone = action.payload.phone;
      state.loggedIn = true;
      state.role = action.payload.role;

      // Save to localStorage
      localStorage.setItem('name', action.payload.name);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('address_no', action.payload.address_no);
      localStorage.setItem('address_street', action.payload.address_street);
      localStorage.setItem('address_city', action.payload.address_city);
      localStorage.setItem('nic', action.payload.nic);
      localStorage.setItem('phone', action.payload.phone);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('role', action.payload.role);
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.address_no = '';
      state.address_street = '';
      state.address_city = '';
      state.nic = '';
      state.phone = '';
      state.loggedIn = false;
      state.role = '';

      // Clear localStorage
      localStorage.clear();
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
