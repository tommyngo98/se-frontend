import { Component, OnInit, input } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { FormsModule } from "@angular/forms";
import { User } from "../../../../../data-domain/models/user.model";
import { SelectFriendService } from "../../../../../services/select-friend.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [FormsModule],
  standalone: true
})
export class ChatComponent implements OnInit {
  public selectedfriend: User | undefined;
  public chatId = input.required<string>();
  public senderId = input.required<number>();
  public message = '';
  public messages: { sender: string; text: string }[] = [];

  public constructor(
    private socketService: SocketService,
    private selectFriendService: SelectFriendService) {}

  public ngOnInit(): void {
    this.selectFriendService.selectedFriend.subscribe(
      (friend) => (this.selectedfriend = friend)
    );

    this.socketService.joinRoom(this.chatId());

    this.socketService.onNewMessage().subscribe((message) => {
      this.messages.push(message);
    });
  }

  public sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.chatId(), this.senderId(), this.message);
      this.message = '';
    }
  }
}
