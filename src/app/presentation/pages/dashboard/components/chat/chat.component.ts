import { Component, ElementRef, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { FormsModule } from "@angular/forms";
import { User} from "../../../../../data-domain/models/user.model";
import { SelectFriendService } from "../../../../../services/select-friend.service";
import { NgClass } from "@angular/common";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { Message } from "../../../../../data-domain/models/message.model";
import { Chat } from "../../../../../data-domain/models/chat.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [FormsModule, NgClass, CtaButtonComponent],
  standalone: true
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageWindow') messageWindow!: ElementRef;

  public chatId: string | undefined;
  public sender = input.required<User>();

  public selectedFriend: User | undefined;
  public message = '';
  public messagesLoaded = false;
  public messages: { from: string; text: string }[] = [];

  private subscriptions: Subscription[] = [];

  public constructor(
    private socketService: SocketService,
    private selectFriendService: SelectFriendService) {}

  public ngOnInit(): void {
    const friendSubscription = this.selectFriendService.selectedFriend.subscribe(
      (friend) => {
        this.selectedFriend = friend;

        this.messages = [];
        this.messagesLoaded = false;

        const foundChat = friend.chats
          .find(chat => chat.friendId === this.sender()._id);

        if (foundChat) {
          this.chatId = foundChat.chatId;
          this.socketService.joinRoom(this.chatId);
        }
      }
    );
    this.subscriptions.push(friendSubscription);

    const storedMessagesSubscription = this.socketService.onStoredMessages().subscribe((chat: Chat) => {
      this.messages = chat.messages.map(message => {
        return {
          from: message.from,
          text: message.text,
        }
        });

        this.scrollToBottom();
        this.messagesLoaded = true;
    })
    this.subscriptions.push(storedMessagesSubscription);

    const newMessageSubscription = this.socketService.onNewMessage().subscribe((message: Message) => {
      this.messages.push(message);

      this.scrollToBottom();
      this.messagesLoaded = true;
    });
    this.subscriptions.push(newMessageSubscription);
  }

  public sendMessage(): void {
    if (this.message.trim() && this.chatId) {
      this.socketService.sendMessage(this.chatId, this.message);

      this.message = '';
      this.scrollToBottom();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageWindow) {
        this.messageWindow.nativeElement.scrollTop = this.messageWindow.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
