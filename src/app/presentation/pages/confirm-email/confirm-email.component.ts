import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ConfirmEmailService } from "../../../services/confirm-email.service";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { FooterComponent } from "../../ui-components/footer/footer.component";
import { CtaButtonComponent } from "../../ui-components/cta-button/cta-button.component";

@Component({
  selector: 'app-confirm-email',
  imports: [
    HeaderComponent,
    FooterComponent,
    CtaButtonComponent,
    RouterLink
  ],
  templateUrl: './confirm-email.component.html',
  standalone: true,
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {
  public errorMessage = '';
  public successMessage = '';

  public constructor(private route: ActivatedRoute, private confirmEmailService: ConfirmEmailService) {}

  public ngOnInit(): void {
    this.confirmEmailService.confirm(this.route.snapshot.queryParamMap.get('token') ?? '')
      .then((data) => {
        this.successMessage = data.msg;
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }
}
