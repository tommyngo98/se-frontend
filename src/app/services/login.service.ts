import { Injectable } from '@angular/core';
import api from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {}

  public async login(email: string, password: string): Promise<any> {
    try {
      const response = await api.post(`/api/user/login`, { email, password });

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public logout(): void {
    localStorage.removeItem('authToken');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
