import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../data-domain/models/user.model";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { FooterComponent } from "../../ui-components/footer/footer.component";
import { SocketService } from "../../../services/socket.service";
import { ChatComponent } from "./components/chat/chat.component";
import { SearchFriendModalComponent } from "./components/search-friend-modal/search-friend-modal.component";
import { CtaButtonComponent } from "../../ui-components/cta-button/cta-button.component";
import { LogoutService } from "../../../services/logout.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ChatComponent,
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
    private socketService: SocketService,
    private logoutService: LogoutService,
    private router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        this.user = await this.userService.getUserByToken(token);
        this.socketService.connect();
      } catch (error) {
        this.logoutService.logout();
        this.router.navigate(['/home']);
      }
    }
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
