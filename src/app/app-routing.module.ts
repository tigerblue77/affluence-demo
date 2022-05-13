import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationComponent} from "./components/reservation/reservation.component";

const routes: Routes = [
  { path: '', redirectTo: '/reservation', pathMatch: 'full' },
  { path: 'reservation', component: ReservationComponent },
  { path: '**',
    redirectTo: '/reservation',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
