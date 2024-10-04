import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingSpotService } from '../services/parking-spot.service';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  parkingSpots: any[] = [];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private parkingSpotService: ParkingSpotService,
    private reservationService: ReservationService,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      parkingSpotName: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.loadParkingSpots();
  }

  loadParkingSpots(): void {
    this.parkingSpotService.getParkingSpots().subscribe(
      (data: any[]) => {
        this.parkingSpots = data;
        if (this.parkingSpots.length === 0) {
          this.errorMessage = 'No parking spots found.';
        }
      },
      (error: any) => {
        console.error('Error loading parking spots', error);
        this.errorMessage = 'Failed to load parking spots. Please try again later.';
      }
    );
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      this.reservationService.createReservation(this.reservationForm.value).subscribe(
        () => {
          this.socketService.notifyReservationChange(); // Notify other clients about the reservation change
          this.router.navigate(['/reservations']);
        },
        (error) => {
          console.error('Reservation error:', error);
        }
      );
    }
  }
  
}
