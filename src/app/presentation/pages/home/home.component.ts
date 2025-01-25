import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../../ui-components/header/header.component";
import {CtaButtonComponent} from "../../ui-components/cta-button/cta-button.component";

@Component({
    selector: 'home',
    imports: [RouterLink, HeaderComponent, CtaButtonComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
