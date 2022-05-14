import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReservationHoursModel} from "../../models/reservation-hours.model"
import {ReservationService} from "../../services/reservation.service";
// @ts-ignore
import data from "../../models/json/reservation-hours.json";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReservationAvailableModel} from "../../models/reservation-available.model";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservationForm: FormGroup;
  datePickerCtrl: FormControl;
  hoursPickerCtrl: FormControl;
  errorMessage: string = '';
  availableReservations: ReservationHoursModel[] = data;

  constructor(private reservationService: ReservationService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.datePickerCtrl = formBuilder.control('', Validators.required);
    this.hoursPickerCtrl = formBuilder.control('', Validators.required);

    this.reservationForm = formBuilder.group({
      date: this.datePickerCtrl,
      hours: this.hoursPickerCtrl,
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    const data = this.formatDate();

    this.reservationService.isDateAvailable(data).subscribe({
      next: (result: ReservationAvailableModel) => {
        this.openSnackBar('close', result.available);
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Server error. Please contact Affluences support.';
      }
    })
  }

  private formatDate(): string {
    let start: string = this.reservationForm.value['date'].toISOString();
    start = start.substr(0,10);

    return `${start}T${this.reservationForm.value['hours']}Z`;
  }

  private openSnackBar(action: string, isValid: boolean): void {
    let isAvailable: string;
    let continueProcess: string;
    let date: string = this.reservationForm.value['date'].toISOString();

    if(isValid) {
      isAvailable = 'available';
      continueProcess = 'You can start the reservation precess.'
    } else {
      isAvailable = 'not available';
      continueProcess = '';
    }

    date = date.substr(0,10);
    const message: string = `The resource is ${isAvailable} on ${date} at ${this.reservationForm.value['hours']}. ${continueProcess}`;

    this.snackBar.open(message, action);
  }
}
