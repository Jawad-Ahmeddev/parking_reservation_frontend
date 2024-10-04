import { Component, OnInit } from '@angular/core';
import { ParkingSpotService } from '../services/parking-spot.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.css']
})
export class ParkingStatusComponent implements OnInit {
  parkingSpots: any[] = [];

  constructor(private parkingSpotService: ParkingSpotService,
    private socketService: SocketService) {}

  ngOnInit(): void {
    this.loadParkingSpots();
    
    this.socketService.onUpdateParkingStatus().subscribe(() => {
      console.log('Parking status updated via socket');
      this.loadParkingSpots();
    });
  }

  

  loadParkingSpots(): void {

    this.parkingSpotService.getParkingSpots().subscribe(
      (spots) => {
        console.log('Parking spots loaded:', spots); // Log raw data

        this.parkingSpots = spots.map(spot => {
          return {
            name: spot.name,
            status: spot.isOccupied ? 'Occupied' : 'Available'
          };
        });
        console.log('Processed parking spots:', this.parkingSpots);
      },
      (error) => {
        console.error('Error loading parking spots:', error);
      }
    );
  }
}
