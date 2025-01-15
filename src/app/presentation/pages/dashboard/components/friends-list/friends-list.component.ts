import { Component, input } from '@angular/core';
import { User } from "../../../../../data-domain/models/user.model";
import { FriendsTileComponent } from "../friends-tile/friends-tile.component";
import { NgClass } from "@angular/common";
import { SelectFriendService } from "../../../../../services/select-friend.service";

@Component({
  selector: 'friends-list',
  standalone: true,
  imports: [
    FriendsTileComponent,
    NgClass
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss'
})
export class FriendsListComponent {
  public constructor(private selectFriendService: SelectFriendService) {}

  public friends = input.required<User[]>();

  public selectedFriend: User | undefined;

  public selectFriend(friend: User) {
    if (friend._id === this.selectedFriend?._id) {
      return;
    }

    this.selectedFriend = friend;
    this.selectFriendService.selectFriend(friend);
  }
}
