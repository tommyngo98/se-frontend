import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import {CtaButtonComponent} from "../../ui-components/cta-button/cta-button.component";

@Component({
  selector: 'home',
  imports: [RouterLink, CtaButtonComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
