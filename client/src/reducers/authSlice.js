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
    const response = await service.login(payload);
    console.log(payload)
    return response;
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
        state.value += action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
          state.status = 'not logged';
      });
  },
});

export const selectUser = (state) => state.user;


export default counterSlice.reducer;
