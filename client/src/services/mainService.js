import CoreService from './coreService';

class AuthService extends CoreService {
  /* eslint-disable no-useless-constructor */
  constructor(endpoint) {
    super(endpoint);
  }

  login(email, password) {
    return this.api.post('login', { email, password }, { requireAuth: false });
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

const instance = new AuthService('/citizenly_endpoints');

export default instance;