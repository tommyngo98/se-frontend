import { Injectable } from '@angular/core';
import api from '../utils/api';
import { Response } from "../data-domain/models/confirm-email-response.model";

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  public async sendFriendRequest(userIndex?: String): Promise<Response> {
    try {
      return (await api.put<Response>(`/api/user/friend-request`, { userIndex }, {
        headers: {
          'x-auth-token': `${localStorage.getItem('authToken')}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }

  public async acceptFriendRequest(userId?: string): Promise<Response> {
    try {
      return (await api.put<Response>(`/api/user/accept-friend-request`, { userId }, {
        headers: {
          'x-auth-token': `${localStorage.getItem('authToken')}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }

  public async denyFriendRequest(userId?: string): Promise<Response> {
    try {
      return (await api.put<Response>(`/api/user/deny-friend-request`, { userId }, {
        headers: {
          'x-auth-token': `${localStorage.getItem('authToken')}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }
}
