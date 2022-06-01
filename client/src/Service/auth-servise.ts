import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "src/http";
import { AuthRes } from "src/store/types";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthRes>> {
    return $api.post<AuthRes>("auth/login", { email, password });
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthRes>> {
    return $api.post<AuthRes>("auth/registration", { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post("auth/logout");
  }

  static async checkAuth(): Promise<void> {
    return axios.get(`${API_URL}auth/refresh`, { withCredentials: true });
  }
}
