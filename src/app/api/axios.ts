import axios, { type AxiosInstance } from "axios";
import AppConfig from "../config/appConfig";
import { store } from "../store/store";
import { setAccessToken, logout } from "@/features/auth/authSlice";

const API: AxiosInstance = axios.create({
  baseURL: AppConfig.BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${AppConfig.BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.content.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
        API.defaults.headers.Authorization = `JWT ${newAccessToken}`;
        originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
