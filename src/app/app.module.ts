import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ParkingStatusComponent } from './parking-status/parking-status.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component'; // Import HttpClientModule
import { AuthInterceptorService } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservationFormComponent,
    ParkingStatusComponent,
    UserReservationsComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    ProfileComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule
    
  
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
