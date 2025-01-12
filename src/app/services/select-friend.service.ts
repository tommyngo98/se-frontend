import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { User } from "../data-domain/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class SelectFriendService {
  private selectedFriend$ = new Subject<User>();
  public selectedFriend = this.selectedFriend$.asObservable();

  public selectFriend(friend: User) {
    this.selectedFriend$.next(friend);
  }
}
