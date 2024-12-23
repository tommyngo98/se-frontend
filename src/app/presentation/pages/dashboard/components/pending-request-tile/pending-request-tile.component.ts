import { Component, input } from '@angular/core';
import { FriendRequest, RequestStatus } from "../../../../../data-domain/models/user.model";
import { FriendRequestService } from "../../../../../services/friend-request.service";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";

@Component({
  selector: 'pending-request-tile',
  standalone: true,
  imports: [CtaButtonComponent],
  templateUrl: './pending-request-tile.component.html',
  styleUrl: './pending-request-tile.component.scss'
})
export class PendingRequestTileComponent {
  public request = input<FriendRequest>();

  public constructor(private friendRequestService: FriendRequestService) {}

  public async accept(): Promise<void> {
    await this.friendRequestService.acceptFriendRequest(this.request()?.from);
  }

  public async deny(): Promise<void> {
    await this.friendRequestService.denyFriendRequest(this.request()?.from);
  }
}
