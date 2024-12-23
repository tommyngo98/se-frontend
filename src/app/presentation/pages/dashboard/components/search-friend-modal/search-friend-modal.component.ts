import { Component, EventEmitter, input, Output } from '@angular/core';
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { FormsModule } from "@angular/forms";
import { SearchResultTileComponent } from "../search-result-tile/search-result-tile.component";
import { FriendRequests, User } from "../../../../../data-domain/models/user.model";
import { UserService } from "../../../../../services/user.service";

@Component({
  selector: 'search-friend-modal',
  standalone: true,
  imports: [
    CtaButtonComponent,
    FormsModule,
    SearchResultTileComponent
  ],
  templateUrl: './search-friend-modal.component.html',
  styleUrl: './search-friend-modal.component.scss'
})
export class SearchFriendModalComponent {
  @Output() close = new EventEmitter<void>();

  public pendingRequests = input<FriendRequests[]>();
  public userId?: number;
  public foundUser: User | undefined;
  public activeTab: string = 'add-friend';

  public constructor(private userService: UserService) {}

  public async setSearchResult(userId?: number): Promise<void> {
    this.foundUser = undefined;
    this.foundUser = await this.userService.getUserById(userId)
  }

  public setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  public closeModal(): void {
    this.close.emit();
  }
}
