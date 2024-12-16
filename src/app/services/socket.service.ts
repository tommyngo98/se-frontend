import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | undefined;

  public connect() {
    this.socket = io('http://localhost:5005', {
      path: '/socket.io',
      withCredentials: true,
    });
  }

  public joinRoom(chatId: string): void {
    if (this.socket) {
      this.socket.emit('joinRoom', chatId);
    }
  }

  public sendMessage(chatId: string, senderId: string, text: string): void {
    if (this.socket) {
      this.socket.emit('sendMessage', { chatId, senderId, text });
    }
  }

  public onNewMessage(): Observable<any> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('newMessage', (message) => {
          observer.next(message);
        });
      }
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
