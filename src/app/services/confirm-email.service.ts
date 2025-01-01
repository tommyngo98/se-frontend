import { Injectable } from '@angular/core';
import api from '../utils/api';
import { AxiosError } from "axios";
import { Response } from "../data-domain/models/confirm-email-response.model";

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {
  public async confirm(token: string): Promise<any> {
    try {
      return (await api.put<Response>(`/api/user/confirm-email?token=${token}`)).data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.msg;
        throw new Error(errorMessage);
      }

      return null;
    }
  }
}
