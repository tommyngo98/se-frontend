import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../data-domain/models/user.model";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { FooterComponent } from "../../ui-components/footer/footer.component";
import { SocketService } from "../../../services/socket.service";
import { ChatComponent } from "./components/chat/chat.component";
import { FriendsListComponent } from "./components/friends-list/friends-list.component";
import { SearchFriendModalComponent } from "./components/search-friend-modal/search-friend-modal.component";
import { CtaButtonComponent } from "../../ui-components/cta-button/cta-button.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    FriendsListComponent,
    SearchFriendModalComponent,
    CtaButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public user: User | undefined;
  public isSearchModalVisible = false;

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

  public showSearchModal(): void {
    this.isSearchModalVisible = true;
  }

  public closeSearchModal(): void {
    this.isSearchModalVisible = false;
  }
}
