import { Component, input } from '@angular/core';
import { User } from "../../../../../data-domain/models/user.model";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { FriendRequestService } from "../../../../../services/friend-request.service";

@Component({
  selector: 'search-result-tile',
  standalone: true,
  imports: [CtaButtonComponent],
  templateUrl: './search-result-tile.component.html',
  styleUrl: './search-result-tile.component.scss'
})
export class SearchResultTileComponent {
  public user = input<User>();

  public constructor(private friendRequestService: FriendRequestService) {}

  public async sendFriendRequest(userId?: string): Promise<void> {
    await this.friendRequestService.sendFriendRequest(userId);
  }
}
