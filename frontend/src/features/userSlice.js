import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    profilePic : null,
    name : 'guest',
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.user = action.payload;
    },
    clearUserDetail: (state) => {
      state.user = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUserDetail, clearUserDetail } = userSlice.actions;

export default userSlice.reducer;