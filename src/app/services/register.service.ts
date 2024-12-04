import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:5005';
  constructor() {}

  public async register(email: string, password: string): Promise<any> {
    try {
      // TODO: Richtigen Endpunkt nutzen
      return (await axios.post(`${this.baseUrl}/api/data`, {email, password})).data;
    } catch (error) {
      console.error('Registrierungsfehler:', error);
      throw error;
    }
  }}
