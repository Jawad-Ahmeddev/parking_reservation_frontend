import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.authService.saveToken(response.token);
          this.successMessage = 'Login successful! Redirecting...';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/status']); // Redirect to the parking status page after login
          }, 1500);
        },
        (error) => {
          this.errorMessage = 'Login failed: Incorrect email or password.';
          this.successMessage = '';
          console.error('Login failed', error);
        }
      );
    }
  }
  
  
}
