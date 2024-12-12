import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginRouteGuard implements CanActivate {
  constructor(private router: Router) {}

  public canActivate(): boolean {
    if (!localStorage.getItem('authToken')) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
