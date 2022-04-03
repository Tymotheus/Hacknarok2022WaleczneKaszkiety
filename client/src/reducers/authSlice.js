import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import service from '../services/mainService'
import { setToken } from '../utils/cookies';
const initialState = {
  status: 'not logged',
  user: {},
  locationDevices: [],
  locations: [],
  institutions: []
};

export const loginUser = createAsyncThunk(
  'auth/login/',
  async (payload) => {
    const response = await service.login(payload.username, payload.password);
    const { access } = response.data;
    return { token: access };
  }
);

export const getAllLocations = createAsyncThunk(
  'get/locations',
  async (institutionId) => {
    const resp = await service.getAllLocations();

    const filtered = resp.filter((element) => element.institution === institutionId);
    return filtered;
  }
)

export const getAllDevicesByLocation = createAsyncThunk(
  'auth/devices/',
  async (payload) => {
    const response = await service.getAllDevicesByLocation(payload);
    return response;
  }
)

export const deleteDevice = createAsyncThunk(
  'delete/device/',
  async (payload) => {
    await service.deleteDevice(payload);
    return payload;
  }
)

export const changeStatus = createAsyncThunk(
  'update/device/status/',
  async ({ device, newStatus }) => {
    const resp = await service.changeStatus({ device, newStatus });
    return resp;
  }
)

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
        //state.status = 'not logged';
        state.status = 'logged';
      })
      .addCase(getAllDevicesByLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllDevicesByLocation.fulfilled, (state, action) => {
        state.locationDevices = action.payload;
      })
      .addCase(getAllDevicesByLocation.rejected, (state) => {
        state.status = 'could not load devices';
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        state.locationDevices = state.locationDevices.filter((element) => element.id !== action.payload)
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.locationDevices = state.locationDevices.filter((element) => element.id !== action.payload.id)
        state.locationDevices = state.locationDevices.concat(action.payload);
      })
      .addCase(getAllLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      });
  },
});

export const selectUser = (state) => state.user;


export default counterSlice.reducer;
