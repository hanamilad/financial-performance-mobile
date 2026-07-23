import axios from "axios";

let authToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === 401) {
    unauthorizedHandler?.();
  }
  return Promise.reject(error);
});
