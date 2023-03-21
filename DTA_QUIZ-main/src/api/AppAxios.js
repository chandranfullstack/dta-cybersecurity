import axios from "axios";
import { getTokenFromStorage } from "src/utils/tokenHandler";
import getHostAPIUrl from "src/appConfig";

export const appAxios = axios.create({
  baseURL: getHostAPIUrl(),
  timeout: 30000,
  responseType: "json",
});

appAxios.interceptors.request.use(async (config) => {
  if (getTokenFromStorage()) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    };
  }

  appAxios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("DTA_TOKEN");
      }
      return Promise.reject(err);
    }
  );

  return config;
});
