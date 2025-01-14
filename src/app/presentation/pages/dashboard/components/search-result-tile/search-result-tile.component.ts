import { Component, input } from '@angular/core';
import { User } from "../../../../../data-domain/models/user.model";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { FriendRequestService } from "../../../../../services/friend-request.service";
import { Response } from "../../../../../data-domain/models/confirm-email-response.model";

@Component({
  selector: 'search-result-tile',
  standalone: true,
  imports: [CtaButtonComponent],
  templateUrl: './search-result-tile.component.html',
  styleUrl: './search-result-tile.component.scss'
})
export class SearchResultTileComponent {
  public user = input<User>();
  public response: Response | undefined;

  public constructor(private friendRequestService: FriendRequestService) {}

  public async sendFriendRequest(userIndex?: string): Promise<void> {
    this.response = await this.friendRequestService.sendFriendRequest(userIndex);
  }
}
