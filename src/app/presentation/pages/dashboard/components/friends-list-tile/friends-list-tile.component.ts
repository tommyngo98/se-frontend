import { Component, input } from '@angular/core';
import { User } from "../../../../../data-domain/models/user.model";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { FriendRequestService } from "../../../../../services/friend-request.service";

@Component({
  selector: 'friends-list-tile',
  standalone: true,
  imports: [
    CtaButtonComponent
  ],
  templateUrl: './friends-list-tile.component.html',
  styleUrl: './friends-list-tile.component.scss'
})
export class FriendsListTileComponent {
  public user = input<User>();

  public constructor(private friendRequestService: FriendRequestService) {}

  public sendFriendRequest(userId?: string): void {
    this.friendRequestService.sendFriendRequest(userId);
  }
}
