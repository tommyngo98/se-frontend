import { Component, input } from '@angular/core';
import { User } from "../../../../../data-domain/models/user.model";

@Component({
  selector: 'friends-list',
  standalone: true,
  imports: [],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss'
})
export class FriendsListComponent {
  public friends = input.required<User[] | undefined>();
}
