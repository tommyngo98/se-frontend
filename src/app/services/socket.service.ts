import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | undefined;
  private errorSubject = new Subject<string>();
  private newMessageSubject = new Subject<any>();

  public connect(): void {
    const token = localStorage.getItem('authToken');

    this.socket = io('http://localhost:5005', {
      path: '/socket.io',
      withCredentials: true,
      auth: {
        token: token, // Include the authToken during connection
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected to server, socket ID:', this.socket?.id);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Connection failed:', err.message);
    });

    this.socket.on('error', (error: { message: string }) => {
      console.error('Server error:', error.message);
      this.errorSubject.next(error.message);
    });

    this.socket.on('newMessage', (message) => {
      console.log('New message received:', message);
      this.newMessageSubject.next(message);
    });
  }

  public joinRoom(chatId: string): void {
    if (this.socket) {
      this.socket.emit('joinRoom', { chatId });
    }
  }

  public sendMessage(chatId: string, text: string): void {
    if (this.socket) {
      this.socket.emit('sendMessage', { chatId, text });
    }
  }

  public onNewMessage(): Observable<any> {
    return this.newMessageSubject.asObservable();
  }

  public onError(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}