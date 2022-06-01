import axios from "axios";

export const API_URL = "http://localhost:3100/";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (!config.headers) {
    throw new Error("heder?");
  }
  config.headers.Autorization = `Berer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
