import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RegisterService } from "../../../services/register.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private registerService: RegisterService) {
  }

  // TODO: Argumente vom HTML Template nehmen
  public register() {
    this.registerService.register('test@test.de', 'test123')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
