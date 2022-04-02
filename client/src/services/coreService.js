import CoreApi from './coreApi';

class CoreService extends CoreApi {
  constructor(endpoint) {
    super();

    // use global enpoint for service if needed, i.e '/utils'
    if (endpoint) {
      this.endpoint = endpoint;
      this.setEndpointUrl(this.endpoint);
    }
  }

  setEndpointUrl(url) {
    this.api.defaults.baseURL = this.baseUrl + url;
    this.api.defaults.withCredentials = true;
  }
}

export default CoreService;
