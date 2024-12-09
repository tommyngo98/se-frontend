import { Injectable } from '@angular/core';
import api from '../utils/api';
import { LoginResponse } from "../data-domain/models/login-response.model";
import {AxiosError} from "axios";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public async login(email: string, password: string): Promise<any> {
    try {
      const response = await api.post<LoginResponse>(`/api/user/login`, { email, password });

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.msg;
        throw new Error(errorMessage);
      }

      return null;
    }
  }
}
