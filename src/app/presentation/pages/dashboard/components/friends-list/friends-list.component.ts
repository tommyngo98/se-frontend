import { Component } from '@angular/core';
import { UserService } from "../../../../../services/user.service";
import { User } from "../../../../../data-domain/models/user.model";
import {FormsModule} from "@angular/forms";
import {FriendsListTileComponent} from "../friends-list-tile/friends-list-tile.component";

@Component({
  selector: 'friends-list',
  standalone: true,
  imports: [
    FormsModule,
    FriendsListTileComponent
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss'
})
export class FriendsListComponent {
  public userId: number = 0;
  public searchResult: User | undefined;

  constructor(private userService: UserService) {}

  public async setSearchResult(userId: number): Promise<void> {
    this.searchResult = await this.userService.getUserById(userId)
  }
}
