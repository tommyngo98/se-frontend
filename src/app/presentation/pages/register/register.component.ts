import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RegisterService } from "../../../services/register.service";
import { InputFormComponent } from "../../ui-components/input-form/input-form.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, InputFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public constructor(private registerService: RegisterService) {}

  public register($event: { email: string; password: string }): void {
    this.registerService.register($event.email, $event.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
