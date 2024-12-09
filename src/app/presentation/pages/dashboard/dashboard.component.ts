import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../data-domain/models/user.model";
import {HeaderComponent} from "../../ui-components/header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent
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
