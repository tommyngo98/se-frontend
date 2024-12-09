import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  public logout(): void {
    localStorage.removeItem('authToken');
  }
}
