import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RegisterService } from "../../../services/register.service";
import { InputFormComponent } from "../../ui-components/input-form/input-form.component";
import {HeaderComponent} from "../../ui-components/header/header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, InputFormComponent, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public constructor(private registerService: RegisterService) {}

  public register($event: { name: string, email: string; password: string }): void {
    this.registerService.register($event.name, $event.email, $event.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
