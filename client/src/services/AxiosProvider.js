import axios from 'axios';

function AxiosProvider(baseUrl) {
  return axios.create({
    baseURL: baseUrl,
  });
}

export default AxiosProvider;