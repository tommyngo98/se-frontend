import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User } from "../../../data-domain/models/user.model";
import { HeaderComponent } from "../../ui-components/header/header.component";
import { FooterComponent } from "../../ui-components/footer/footer.component";
import { WebsocketService } from "../../../services/websocket.service";
import { Subscription } from "rxjs";
import { Message } from "../../../data-domain/models/message.model";

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
export class DashboardComponent implements OnInit, OnDestroy {
  public user: User | undefined;
  public messages: Message[] = [];

  private messageSubscription = Subscription.EMPTY;

  constructor(private userService: UserService, private websocketService: WebsocketService) {}

  public async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.user = await this.userService.getUserByToken(token);
    }

    // TODO: Use actual Websocket URL
    this.websocketService.connect('');
    this.messageSubscription = this.websocketService.messages$.subscribe((message) => {
      if (message) {
        this.messages.push(message);
      }
    })
  }

  public ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    this.websocketService.disconnect();
  }
}
