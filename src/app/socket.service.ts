import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${environment.backendUrl}`); // Update with your backend URL
        console.log(`${environment.backendUrl}`)

  }

  onUpdateParkingStatus(): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.on('updateParkingStatus', () => {
        observer.next();
      });
    });
  }

  onUpdateUserReservations(userId: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.on('updateUserReservations', (id) => {
        if (id === userId) {
          observer.next();
        }
      });
    });
  }

  notifyReservationChange(): void {
    this.socket.emit('reservationChange');
  }
}
