import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor() {}

  async register(email: string, password: string): Promise<any> {
    try {
      return (await axios.post(`/`, {email, password})).data;
    } catch (error) {
      console.error('Registrierungsfehler:', error);
      throw error;
    }
  }}
