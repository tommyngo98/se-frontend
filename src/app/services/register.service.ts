import { Injectable } from '@angular/core';
import api from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor() {}

  public async register(email: string, password: string): Promise<any> {
    try {
      // TODO: Richtigen Endpunkt nutzen
      return (await api.post(`/api/data`, {email, password})).data;
    } catch (error) {
      console.error('Registrierungsfehler:', error);
      throw error;
    }
  }}
