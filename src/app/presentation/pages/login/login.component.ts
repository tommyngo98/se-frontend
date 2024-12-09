import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { InputFormComponent } from "../../ui-components/input-form/input-form.component";
import { LoginService } from "../../../services/login.service";
import { HeaderComponent } from "../../ui-components/header/header.component";
import {CtaButtonComponent} from "../../ui-components/cta-button/cta-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, InputFormComponent, HeaderComponent, CtaButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public constructor(private loginService: LoginService, private router: Router) {} // Inject Router

  public login($event: { email: string; password: string }): void {
    this.loginService.login($event.email, $event.password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          console.log(error.response.data.message);
        }
      });
  }
}
