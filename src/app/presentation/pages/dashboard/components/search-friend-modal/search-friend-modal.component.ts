import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { FormsModule } from "@angular/forms";
import { SearchResultTileComponent } from "../search-result-tile/search-result-tile.component";
import { FriendRequest, User } from "../../../../../data-domain/models/user.model";
import { UserService } from "../../../../../services/user.service";
import { PendingRequestTileComponent } from "../pending-request-tile/pending-request-tile.component";
import {ToggleComponent} from "../../../../ui-components/toggle/toggle.component";

@Component({
  selector: 'search-friend-modal',
  imports: [
    CtaButtonComponent,
    FormsModule,
    SearchResultTileComponent,
    PendingRequestTileComponent,
    ToggleComponent
  ],
  templateUrl: './search-friend-modal.component.html',
  standalone: true,
  styleUrl: './search-friend-modal.component.scss'
})
export class SearchFriendModalComponent {
  @Output() close = new EventEmitter<void>();

  public pendingRequests = input<FriendRequest[]>();
  public showHint = computed(() => {
    return this.pendingRequests()?.length;
  });
  public searchedUserId?: number;
  public foundUser: User | undefined;
  public activeTab: string = 'add-friend';
  public errorMessage: string | undefined;
  public user = input<User>();
  public userFriends = input<User[]>();
  public isMe = false;
  public isFriend = false;

  public constructor(private userService: UserService) {}

  public async setSearchResult(userIndex?: number): Promise<void> {
    this.foundUser = undefined;
    this.errorMessage = '';

    try {
      this.foundUser = await this.userService.getUserByIndex(userIndex);
    } catch (e) {
      this.errorMessage = 'Nutzer nicht gefunden.'
    }
  }

  public setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.errorMessage = '';
  }

  public onUserIdChange(): void {
    this.isMe = false;
    this.isFriend = false;
    if (this.user()?.user_id === this.searchedUserId ) {
      this.isMe = true;
    }

    if (this.userFriends()?.some(friend => parseInt(friend.user_id) === this.searchedUserId)) {
      this.isFriend = true;
    }

    this.foundUser = undefined;
    this.errorMessage = '';
  }

  public closeModal(): void {
    this.close.emit();
  }
}
