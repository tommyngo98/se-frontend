import { Component } from '@angular/core';
import { UserService } from "../../../../../services/user.service";
import { User } from "../../../../../data-domain/models/user.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'friends-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss'
})
export class FriendsListComponent {
  public userId: string = '';
  public searchResult: User | undefined;

  constructor(private userService: UserService) {}

  public async setSearchResult(userId: string): Promise<void> {
    this.searchResult = await this.userService.getUserById(userId)
  }
}
