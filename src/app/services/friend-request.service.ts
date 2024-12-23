import { Injectable } from '@angular/core';
import api from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  public async sendFriendRequest(userId?: string): Promise<string> {
    try {
      return (await api.put<string>(`/api/user/friend-request`, { userId }, {
        headers: {
          'x-auth-token': `${localStorage.getItem('authToken')}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }
}
