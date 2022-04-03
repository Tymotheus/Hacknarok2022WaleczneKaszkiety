// import axios from "axios";
import AxiosProvider from "./AxiosProvider";
import env from "../config";
import { getToken, setToken } from "../utils/cookies";

class CoreApi {
  constructor(baseUrl = env.baseURL) {
    this.api = AxiosProvider(baseUrl);
    this.baseUrl = baseUrl;

    this.afterResponse = this.afterResponse.bind(this);
    this.beforeRequest = this.beforeRequest.bind(this);
    this.setInterceptors(
      this.beforeRequest,
      this.requestError,
      this.afterResponse
    );
  }

  setInterceptors(beforeRequest, requestError, afterResponse, responseError) {
    this.api.interceptors.request.use(beforeRequest, requestError);
    this.api.interceptors.response.use(afterResponse, responseError);
  }

  setEndpointUrl(url) {
    this.api.defaults.baseURL = `${this.baseUrl}/${url}`;
  }

  beforeRequest(config) {
    // if ("requireAuth" in config && config.requireAuth === false) {
    //   //config.headers['Access-Control-Allow-Origin'] = '*';
    //   return config;
    // }

    // const token = getToken();
    // if (token) {
    //   const originalRequest = config;
    //   originalRequest.headers.Authorization = token;
    //   return originalRequest;
    // }
    // return new Error("User not logged in");
    return config;
  }

  requestError(error) {
    throw error;
  }

  afterResponse(resp) {
    return resp.data || resp;
  }

  responseError(error) {
    throw error;
    }
}

export default CoreApi;
