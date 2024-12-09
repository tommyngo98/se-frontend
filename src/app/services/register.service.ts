import { Injectable } from '@angular/core';
import api from '../utils/api';
import {AxiosError} from "axios";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public async register(name: string, email: string, password: string): Promise<any> {
    try {
      return (await api.post(`/api/user/register`, {displayed_name: name, email, password})).data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.msg;
        throw new Error(errorMessage);
      }

      return null;
    }
  }
}
