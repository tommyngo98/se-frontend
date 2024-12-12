import { Component } from '@angular/core';
import {CtaButtonComponent} from "../cta-button/cta-button.component";

@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [
        CtaButtonComponent
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
