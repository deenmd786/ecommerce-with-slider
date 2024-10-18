import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    user: userReducer, // Ensure this matches the key you're using in useSelector
  }
})