import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { SocketService } from '../socket.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReservations();

    const userId = this.authService.getUserId();
    if (userId) {
      this.socketService.onUpdateUserReservations(userId).subscribe(() => {
        this.loadReservations();
      });
    }
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe(
      (reservations) => {
        this.reservations = reservations;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  cancelReservation(reservationId: string): void {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservationService.cancelReservation(reservationId).subscribe(
        () => {
          console.log('Reservation canceled');
          this.loadReservations(); // Refresh reservations list after cancellation
        },
        (error) => {
          console.error('Error canceling reservation:', error);
        }
      );
    }
  }
}
