import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.get<any>(`${environment.backendUrl}/api/users/profile`, { headers })
        .subscribe(
          data => {
            this.user = data; // Assign the fetched user data to this.user
          },
          error => {
            console.error('Error fetching user details:', error); // Log any errors that occur
            this.errorMessage = 'Error fetching user details.'; // Show an error message if something goes wrong
          }
        );
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if the token is missing
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
