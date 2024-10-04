import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ParkingStatusComponent } from './parking-status/parking-status.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reserve', component: ReservationFormComponent },
  { path: 'status', component: ParkingStatusComponent },
  { path: 'reservations', component: UserReservationsComponent },
  { path: 'profile', component: ProfileComponent }, // Add the profile route

  // Add any additional routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }