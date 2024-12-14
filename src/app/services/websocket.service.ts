import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from "../data-domain/models/message.model";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private messageSubject: BehaviorSubject<Message | null> = new BehaviorSubject<Message | null>(null);

  public messages$ = this.messageSubject.asObservable();

  public connect(url: string): void {
    if (!this.socket) {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('WebSocket-Verbindung geöffnet');
      };

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Nachricht vom Server:', message);

        this.messageSubject.next(message);
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket-Fehler:', error);
      };

      this.socket.onclose = () => {
        console.log('Verbindung zum Server geschlossen');
      };
    }
  }

  public sendMessage(from: number, to: number, text: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = { from, to, text };
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket ist nicht verbunden.');
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
