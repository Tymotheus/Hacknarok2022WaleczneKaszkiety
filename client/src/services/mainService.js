import CoreService from './coreService';

class AuthService extends CoreService {
  /* eslint-disable no-useless-constructor */
  constructor(endpoint) {
    super(endpoint);
  }

  login(username, password) {
    return this.api.post('users/login/', { username, password }, { requireAuth: false });
  }

  getAllLocations() {
    return this.api.get('citizenly_endpoints/locations/', { requireAuth: false });
  }

  getAllDevicesByLocation(locationId) {
    return this.api.post('citizenly_endpoints/devices/by-location/', { location_id: locationId }, { requireAuth: false })
  }

  deleteDevice(deviceId) {
    const resp = this.api.delete(`citizenly_endpoints/devices/${deviceId}`, { requireAuth: false })
    return resp
  }

  changeStatus({ device, newStatus }) {
    return this.api.put(`citizenly_endpoints/devices/${device.id}/`, { name: device.name, location: device.location, comment: device.comment, votes: device.votes, type: device.type, status: newStatus }, { requireAuth: false })
  }

  register(email, password, name, countryCode, phoneNumber) {
    return this.api.post(
      '/authentication/signup',
      {
        email,
        password,
        name,
      },
      { requireAuth: false },
    );
  }

  fetchUser() {
    return this.api.get('/me');
  }
}

const instance = new AuthService('');

export default instance;