import CoreService from './coreService';

class AuthService extends CoreService {
  /* eslint-disable no-useless-constructor */
  constructor(endpoint) {
    super(endpoint);
  }

  login(username, password) {
    return this.api.post('/login/', { username, password }, { requireAuth: false });
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

const instance = new AuthService('/users');

export default instance;