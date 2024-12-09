import { Injectable } from '@angular/core';
import api from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor() {}

  public async register(name: string, email: string, password: string): Promise<any> {
    try {
      return (await api.post(`/api/user/register`, {displayed_name: name, email, password})).data;
    } catch (error) {
      console.error('Registrierungsfehler:', error);
      throw error;
    }
  }
}
