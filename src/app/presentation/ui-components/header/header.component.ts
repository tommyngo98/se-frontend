import { Component, input } from '@angular/core';
import { CtaButtonComponent } from "../cta-button/cta-button.component";
import { LogoutService } from "../../../services/logout.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    imports: [CtaButtonComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public username = input<string>();

  public constructor(private logoutService: LogoutService, private router: Router) {}

  public redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  public logout(): void {
    this.logoutService.logout();
    this.router.navigate(['/home'])
  }
}
