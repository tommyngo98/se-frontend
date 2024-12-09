import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {InputFormComponent} from "../../ui-components/input-form/input-form.component";
import {LoginService} from "../../../services/login.service";

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
  constructor(private loginService: LoginService) {}

  login($event: { name: string, email: string; password: string }): void {
    this.loginService.login($event.email, $event.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
