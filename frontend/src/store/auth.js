// src/store/auth.js
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  userID: localStorage.getItem('userID') || null,
  gameProfileID: localStorage.getItem('gameProfileID') || null
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('userID', JSON.stringify(action.payload.userID));
      localStorage.setItem('gameProfileID', JSON.stringify(action.payload.gameProfileID));
      state.isAuthenticated = true;
      state.userID = action.payload.userID;
      state.gameProfileID = action.payload.gameProfileID;
    },
    logout(state) {
      localStorage.clear();
      state.isAuthenticated = false;
      state.userID = null;
      state.gameProfileID = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;