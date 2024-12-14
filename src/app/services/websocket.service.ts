import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private messageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public messages$ = this.messageSubject.asObservable();

  public connect(url: string): void {
    if (!this.socket) {
      this.socket = new WebSocket(url);

      // Wenn die Verbindung geöffnet wird
      this.socket.onopen = () => {
        console.log('WebSocket-Verbindung geöffnet');
      };

      // Wenn eine Nachricht vom Server empfangen wird
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Nachricht vom Server:', message);

        // Nachricht im BehaviorSubject speichern (für Komponenten zugänglich)
        this.messageSubject.next(message);
      };

      // Fehlerbehandlung
      this.socket.onerror = (error) => {
        console.error('WebSocket-Fehler:', error);
      };

      // Wenn die Verbindung geschlossen wird
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
