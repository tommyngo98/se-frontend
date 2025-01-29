import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { FormsModule } from "@angular/forms";
import { SearchResultTileComponent } from "../search-result-tile/search-result-tile.component";
import { FriendRequest, User } from "../../../../../data-domain/models/user.model";
import { UserService } from "../../../../../services/user.service";
import { PendingRequestTileComponent } from "../pending-request-tile/pending-request-tile.component";

@Component({
  selector: 'search-friend-modal',
  imports: [
    CtaButtonComponent,
    FormsModule,
    SearchResultTileComponent,
    PendingRequestTileComponent
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
  public userId?: string;
  public foundUser: User | undefined;
  public activeTab: string = 'add-friend';
  public errorMessage: string | undefined;

  public constructor(private userService: UserService) {}

  public async setSearchResult(userIndex?: string): Promise<void> {
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

  public closeModal(): void {
    this.close.emit();
  }
}
