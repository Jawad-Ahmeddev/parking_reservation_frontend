import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {
  private baseUrl = `${environment.backendUrl}/api/parking`;

  constructor(private http: HttpClient) {}

  getParkingSpots(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
