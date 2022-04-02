import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../services/mainService'
import { setToken } from '../utils/cookies';
const initialState = {
  status: 'not logged',
  user: {},
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload) => {
    const response = await service.login(payload.username, payload.password);
    const {access} = response.data;
    return {token: access};
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setToken(action.payload.token)
        state.status = 'logged';
      })
      .addCase(loginUser.rejected, (state) => {
          state.status = 'not logged';
          // state.status = 'logged';
      });
  },
});

export const selectUser = (state) => state.user;


export default counterSlice.reducer;
