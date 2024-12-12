import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../data-domain/models/user.model";
import {HeaderComponent} from "../../ui-components/header/header.component";
import {FooterComponent} from "../../ui-components/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  public user: User | undefined;

  constructor(private userService: UserService, ) {}

  public async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.user = await this.userService.getUserByToken(token);
    }
  }
}
