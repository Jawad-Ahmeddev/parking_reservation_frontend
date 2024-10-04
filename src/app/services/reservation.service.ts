import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = `${environment.backendUrl}/api/parking`;

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createReservation(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  cancelReservation(reservationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reservationId}`);
  }
}
