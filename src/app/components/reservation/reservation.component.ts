import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReservationHoursModel} from "../../models/reservation-hours.model"
import {ReservationService} from "../../services/reservation.service";
// @ts-ignore
import data from "../../models/json/reservation-hours.json";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservationForm: FormGroup;
  datePicker: FormControl;
  hoursPickerCtrl: FormControl;
  errorMessage: string = '';
  availableReservations: ReservationHoursModel[] = data;

  constructor(private reservationService: ReservationService,
              public formBuilder: FormBuilder) {
    this.datePicker = formBuilder.control('', Validators.required);
    this.hoursPickerCtrl = formBuilder.control('', Validators.required);

    this.reservationForm = formBuilder.group({
      date: this.datePicker,
      hours: this.hoursPickerCtrl,
    });
  }

  onSubmit(): void {
    const data = this.formatDate();
    this.reservationService.isDateAvailable(data).subscribe({
      next: (value: {available: boolean}) => {
        console.log(value);
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error.message;
      }
    })
  }

  private formatDate(): string {
    let start: string = this.reservationForm.value['date'].toISOString();
    start = start.substr(0,10);
    return `${start}T${this.reservationForm.value['hours']}Z`;
  }
}
