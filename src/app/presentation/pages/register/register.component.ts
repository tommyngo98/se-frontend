import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RegisterService } from "../../../services/register.service";
import { InputFormComponent } from "../../ui-components/input-form/input-form.component";
import {HeaderComponent} from "../../ui-components/header/header.component";
import {FooterComponent} from "../../ui-components/footer/footer.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, InputFormComponent, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public errorMessage = '';
  public successMessage = '';
  public constructor(private registerService: RegisterService) {}

  public register($event: { name: string, email: string; password: string }): void {
    this.errorMessage = '';
    this.registerService.register($event.name, $event.email, $event.password)
      .then(response => {
        this.successMessage = response.msg;
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }
}
