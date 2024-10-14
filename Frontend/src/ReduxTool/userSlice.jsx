import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    address_no: '',
    address_street: '',
    address_city: '',
    nic: '',
    phone: '',
    loggedIn: false,
    userId: null,
    role: ''
  },
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
      state.userId = action.payload.userId;
      state.role = action.payload.role;
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
      state.userId = null;
      state.role = '';
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
