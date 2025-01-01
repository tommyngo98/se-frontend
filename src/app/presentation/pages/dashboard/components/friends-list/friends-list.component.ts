import { Component, input } from '@angular/core';
import { User } from "../../../../../data-domain/models/user.model";
import { FriendsTileComponent } from "../friends-tile/friends-tile.component";

@Component({
  selector: 'friends-list',
  standalone: true,
  imports: [
    FriendsTileComponent
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss'
})
export class FriendsListComponent {
  public friends = input.required<User[]>();
}
