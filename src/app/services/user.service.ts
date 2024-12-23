import { Injectable } from '@angular/core';
import api from '../utils/api';
import { User } from "../data-domain/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public async getUserById(id: number): Promise<User> {
    try {
      return (await api.get<User>(`/api/user/${id}`)).data
    } catch (error) {
      throw error;
    }
  }

  public async getUserByToken(token: string): Promise<User> {
    try {
      return (await api.get<User>(`/api/user/me`,{
        headers: {
          'x-auth-token': `${token}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }
}
