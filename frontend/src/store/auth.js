// src/store/auth.js
import { createSlice } from '@reduxjs/toolkit';

// const parseJwt = (token) => { // TODO: Relevant to late stage when we will need to check the jwt expression
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch (e) {
//     return null;
//   }
// }; 

  // if(isAuth) { // TODO: Relevant to late stage when we will need to check the jwt expression
  //   const decodedJwt = parseJwt(localStorage.getItem("token"));
  //   console.log(decodedJwt.exp * 1000 < Date.now());
  //   console.log(decodedJwt.exp * 1000, Date.now());
  // }

const initialAuthState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  userID: localStorage.getItem('userID') || null,
  gameProfileID: localStorage.getItem('gameProfileID') || null,
  token: localStorage.getItem("token") || null
};


const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userID', action.payload.userID);
      localStorage.setItem('gameProfileID', action.payload.gameProfileID);
      state.isAuthenticated = true;
      state.userID = action.payload.userID;
      state.gameProfileID = action.payload.gameProfileID;
      state.token = action.payload.token;
    },
    logout(state) {
      localStorage.clear();
      state.isAuthenticated = false;
      state.userID = null;
      state.gameProfileID = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;