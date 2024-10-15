import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from './userSlice';
import cityReducer from './citySlice'; // Import the slice reducer

const store = configureStore({
    reducer:{
        user : userReducer,
        city: cityReducer, 
    }
})

export default store;