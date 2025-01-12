import { Component, OnInit, input, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { FormsModule } from "@angular/forms";
import { User } from "../../../../../data-domain/models/user.model";
import { SelectFriendService } from "../../../../../services/select-friend.service";
import { NgClass } from "@angular/common";
import {CtaButtonComponent} from "../../../../ui-components/cta-button/cta-button.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [FormsModule, NgClass, CtaButtonComponent],
  standalone: true
})
export class ChatComponent implements OnInit {
  @ViewChild('messageWindow') messageWindow!: ElementRef;

  public chatId: string | undefined;
  public sender = input.required<User>();

  public selectedFriend: User | undefined;
  public message = '';
  public messages: { sender: string; text: string }[] = [];

  public constructor(
    private socketService: SocketService,
    private selectFriendService: SelectFriendService) {}

  public ngOnInit(): void {
    this.selectFriendService.selectedFriend.subscribe(
      (friend) => {
        this.selectedFriend = friend;

        this.messages = [];

        const foundChat = friend.chats
          .find(chat => chat.friendId === this.sender()._id);

        if (foundChat) {
          this.chatId = foundChat.chatId;
          this.socketService.joinRoom(this.chatId);
          this.loadChatMessages();
        }
      }
    );

    this.socketService.onNewMessage().subscribe((message) => {
      if (!this.messages) {
        this.messages = [];
      }
      this.messages.push(message);
      this.scrollToBottom();
    });
  }

  public sendMessage(): void {
    if (this.message.trim() && this.chatId) {
      this.socketService.sendMessage(this.chatId, this.sender().user_id, this.message);
      this.message = '';
      this.scrollToBottom();
    }
  }

  // TODO: get messages from DB
  public loadChatMessages(): void {
    // Nachrichten aus der Datenbank oder von einer API laden, z.B.:
    // this.messages = await this.chatService.getMessages(this.chatId);

    this.messages = [];
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageWindow) {
        this.messageWindow.nativeElement.scrollTop = this.messageWindow.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
