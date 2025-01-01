import { Injectable } from '@angular/core';
import api from '../utils/api';
import { Response } from "../data-domain/models/confirm-email-response.model";

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  public async sendFriendRequest(userId?: string): Promise<Response> {
    try {
      return (await api.put<Response>(`/api/user/friend-request`, { userId }, {
        headers: {
          'x-auth-token': `${localStorage.getItem('authToken')}`
        }
      })).data
    } catch (error) {
      throw error;
    }
  }

  public async acceptFriendRequest(userId?: number): Promise<Response> {
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

  public async denyFriendRequest(userId?: number): Promise<Response> {
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
