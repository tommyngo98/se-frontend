import {Component, ElementRef, HostListener, input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { FormsModule } from "@angular/forms";
import { User } from "../../../../../data-domain/models/user.model";
import { SelectFriendService } from "../../../../../services/select-friend.service";
import { DatePipe, KeyValuePipe, NgClass } from "@angular/common";
import { CtaButtonComponent } from "../../../../ui-components/cta-button/cta-button.component";
import { Message } from "../../../../../data-domain/models/message.model";
import { Chat } from "../../../../../data-domain/models/chat.model";
import { Subscription } from "rxjs";
import { groupMessagesByDate } from "../../../../../utils/group-messages-by-date";
import { DateTranslatePipe } from "../../../../../utils/pipes/date-translate.pipe";
import {getTime} from "../../../../../utils/get-time";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [FormsModule, NgClass, CtaButtonComponent, KeyValuePipe, DatePipe, DateTranslatePipe],
  standalone: true,
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageWindow') messageWindow!: ElementRef;

  public chatId: string | undefined;
  public sender = input.required<User>();

  public isMobileView: boolean = false;
  public selectedFriend: User | undefined;
  public message = '';
  public messagesLoaded = false;
  public groupedMessages: Record<string, { from: string, text: string, timestamp: Date }[]> = {};
  private subscriptions: Subscription[] = [];

  public constructor(
    private socketService: SocketService,
    private selectFriendService: SelectFriendService) {}

  public ngOnInit(): void {
    this.addFriendSubscription();
    this.addStoredMessagesSubscription();
    this.addNewMessageSubscription();
    this.checkIfMobile();
  }

  public addFriendSubscription(): void {
    const friendSubscription = this.selectFriendService.selectedFriend.subscribe((friend) => {
      this.selectedFriend = friend;
      this.messagesLoaded = false;

      const foundChat = friend.chats.find(chat => chat.friendId === this.sender()._id);

      if (foundChat) {
        this.chatId = foundChat.chatId;
        this.socketService.joinRoom(this.chatId);
      }
    });
    this.subscriptions.push(friendSubscription);
  }

  public addStoredMessagesSubscription(): void {
    const storedMessagesSubscription = this.socketService.onStoredMessages().subscribe((chat: Chat) => {
      const messages = chat.messages.map(message => ({
        from: message.from,
        text: message.text,
        timestamp: new Date(message.timestamp)
      }));

      this.groupedMessages = groupMessagesByDate(messages);
      this.scrollToBottom();
      this.messagesLoaded = true;
    });
    this.subscriptions.push(storedMessagesSubscription);
  }

  public addNewMessageSubscription(): void {
    const newMessageSubscription = this.socketService.onNewMessage().subscribe((message: Message) => {
      const dateKey = new Date(message.timestamp).toISOString().split("T")[0];

      if (!this.groupedMessages[dateKey]) {
        this.groupedMessages[dateKey] = [];
      }
      this.groupedMessages[dateKey].push(message);

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

  @HostListener('window:resize', ['$event'])
  public checkIfMobile(): void {
    console.log('test');
    this.isMobileView = window.innerWidth <= 768;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageWindow) {
        this.messageWindow.nativeElement.scrollTop = this.messageWindow.nativeElement.scrollHeight;
      }
    }, 100);
  }

  protected readonly Object = Object;
  protected readonly getTime = getTime;
}
