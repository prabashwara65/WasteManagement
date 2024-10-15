// features/citySlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const initialState = {
  cityAssign: {
    Colombo: localStorage.getItem('Colombo') || '',
    Kandy: localStorage.getItem('Kandy') || '',
    Galle: localStorage.getItem('Galle') || '',
    Jaffna: localStorage.getItem('Jaffna') || '',
  },
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    updateCityAssign: (state, action) => {
      state.cityAssign = {
        ...state.cityAssign,
        ...action.payload,
      };

      // Save to localStorage
      localStorage.setItem('Colombo', state.cityAssign.Colombo);
      localStorage.setItem('Kandy', state.cityAssign.Kandy);
      localStorage.setItem('Galle', state.cityAssign.Galle);
      localStorage.setItem('Jaffna', state.cityAssign.Jaffna);
    },
  },
});

// Export the action
export const { updateCityAssign } = citySlice.actions;

// Export the reducer
export default citySlice.reducer;
