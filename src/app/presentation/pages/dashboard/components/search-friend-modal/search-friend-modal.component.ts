import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { FormsModule } from "@angular/forms";
import { FriendsListTileComponent } from "../friends-list-tile/friends-list-tile.component";
import { User } from "../../../../../data-domain/models/user.model";
import { UserService } from "../../../../../services/user.service";

@Component({
  selector: 'search-friend-modal',
  standalone: true,
  imports: [
    CtaButtonComponent,
    FormsModule,
    FriendsListTileComponent
  ],
  templateUrl: './search-friend-modal.component.html',
  styleUrl: './search-friend-modal.component.scss'
})
export class SearchFriendModalComponent {
  @Input() content: string = '';
  @Output() close = new EventEmitter<void>();

  public userId?: number;
  public searchResult: User | undefined;
  public activeTab: string = 'add-friend';

  constructor(private userService: UserService) {}

  public async setSearchResult(userId?: number): Promise<void> {
    this.searchResult = undefined;
    this.searchResult = await this.userService.getUserById(userId)
  }

  public setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  public closeModal(): void {
    this.close.emit();
  }
}
