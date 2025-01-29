import { Component } from '@angular/core';
import {CtaButtonComponent} from "../cta-button/cta-button.component";

@Component({
  selector: 'app-footer',
  imports: [
    CtaButtonComponent
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
