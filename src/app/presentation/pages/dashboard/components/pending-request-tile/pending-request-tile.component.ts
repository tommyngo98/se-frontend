import { Component, Input, OnInit } from '@angular/core';
import { FriendRequest, User } from "../../../../../data-domain/models/user.model";
import { FriendRequestService } from "../../../../../services/friend-request.service";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { Response } from "../../../../../data-domain/models/confirm-email-response.model";
import { UserService } from "../../../../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'pending-request-tile',
  imports: [CtaButtonComponent],
  templateUrl: './pending-request-tile.component.html',
  standalone: true,
  styleUrl: './pending-request-tile.component.scss'
})
export class PendingRequestTileComponent implements OnInit {
  @Input()
  public request: FriendRequest | undefined;
  public requestFrom: User | undefined
  public response: Response | undefined;

  public constructor(
    private friendRequestService: FriendRequestService,
    private userService: UserService,
    private router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.requestFrom = await this.userService.getUserById((this.request?.from));
  }

  public async accept(): Promise<void> {
    this.response = await this.friendRequestService.acceptFriendRequest(this.request?.from);
    this.request = undefined;
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/dashboard'])
      });
  }

  public async deny(): Promise<void> {
    this.response = await this.friendRequestService.denyFriendRequest(this.request?.from);
    this.request = undefined;
  }
}
