import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { InputFormComponent } from "../../ui-components/input-form/input-form.component";
import { LoginService } from "../../../services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        RouterLink,
        InputFormComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {} // Inject Router

  login($event: { name: string, email: string; password: string }): void {
    this.loginService.login($event.email, $event.password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
