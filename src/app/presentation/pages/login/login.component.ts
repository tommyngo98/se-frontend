import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { InputFormComponent } from "../../ui-components/input-form/input-form.component";
import { LoginService } from "../../../services/login.service";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { CtaButtonComponent } from "../../ui-components/cta-button/cta-button.component";
import { FooterComponent } from "../../ui-components/footer/footer.component";

@Component({
    selector: 'app-login',
    imports: [RouterLink, InputFormComponent, HeaderComponent, CtaButtonComponent, FooterComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  public errorMessage = '';
  public constructor(private loginService: LoginService, private router: Router) {}

  public login($event: { email: string; password: string }): void {
    this.errorMessage = '';
    this.loginService.login($event.email, $event.password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }
}
