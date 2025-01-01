import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../data-domain/models/user.model";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { FooterComponent } from "../../ui-components/footer/footer.component";
import { SocketService } from "../../../services/socket.service";
import { ChatComponent } from "./components/chat/chat.component";
import { FriendsListComponent } from "./components/friends-list/friends-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    FriendsListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public user: User | undefined;
  public friends: User[] = [];

  public constructor(
    private userService: UserService,
    private socketService: SocketService
  ) {}

  public async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.user = await this.userService.getUserByToken(token);

      for (let friendId of this.user.friends) {
        const friend = await this.userService.getUserById(friendId);
        this.friends.push(friend);
      }
    }

    this.socketService.connect();
  }

  public ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
