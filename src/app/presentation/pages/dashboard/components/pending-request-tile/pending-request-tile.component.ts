import { Component, Input } from '@angular/core';
import { FriendRequest } from "../../../../../data-domain/models/user.model";
import { FriendRequestService } from "../../../../../services/friend-request.service";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { Response } from "../../../../../data-domain/models/confirm-email-response.model";

@Component({
  selector: 'pending-request-tile',
  imports: [CtaButtonComponent],
  templateUrl: './pending-request-tile.component.html',
  standalone: true,
  styleUrl: './pending-request-tile.component.scss'
})
export class PendingRequestTileComponent {
  @Input()
  public request: FriendRequest | undefined;
  public response: Response | undefined;

  public constructor(private friendRequestService: FriendRequestService) {}

  public async accept(): Promise<void> {
    this.response = await this.friendRequestService.acceptFriendRequest(this.request?.from);
    this.request = undefined;
  }

  public async deny(): Promise<void> {
    this.response = await this.friendRequestService.denyFriendRequest(this.request?.from);
    this.request = undefined;
  }
}
