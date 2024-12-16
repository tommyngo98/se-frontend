import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../data-domain/models/user.model";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { FooterComponent } from "../../ui-components/footer/footer.component";
import { SocketService } from "../../../services/socket.service";
import { ChatComponent } from "./components/chat/chat.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ChatComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public user: User | undefined;

  public constructor(
    private userService: UserService,
    private socketService: SocketService
  ) {}

  public async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.user = await this.userService.getUserByToken(token);
    }

    this.socketService.connect();
  }

  public ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
