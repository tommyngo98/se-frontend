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

  public async acceptFriendRequest(userId?: number): Promise<string> {
    try {
      return (await api.put<string>(`/api/user/accept-friend-request`, { userId }, {
        headers: {
          'x-auth-token': `${localStorage.getItem('authToken')}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }

  public async denyFriendRequest(userId?: number): Promise<string> {
    try {
      return (await api.put<string>(`/api/user/deny-friend-request`, { userId }, {
        headers: {
          'x-auth-token': `${localStorage.getItem('authToken')}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }
}
