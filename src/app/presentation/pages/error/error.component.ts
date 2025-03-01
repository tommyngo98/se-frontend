import { Component } from '@angular/core';
import { FooterComponent } from "../../ui-components/footer/footer.component";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { CtaButtonComponent } from "../../ui-components/cta-button/cta-button.component";
import { RouterLink} from "@angular/router";

@Component({
  selector: 'app-error',
  imports: [
    FooterComponent,
    HeaderComponent,
    CtaButtonComponent,
    RouterLink
  ],
  templateUrl: './error.component.html',
  standalone: true,
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

}
