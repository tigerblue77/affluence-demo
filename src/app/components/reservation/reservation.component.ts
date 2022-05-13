import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../services/reservation.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  datePicker: FormControl;
  hoursPickerCtrl: FormControl;
  errorMessage: string = '';
  availableReservations = ['10:00', '10:30', '11:00', '11:30'];

  constructor(private reservationService: ReservationService,
              public formBuilder: FormBuilder,) {
    this.datePicker = formBuilder.control('', Validators.required);
    this.hoursPickerCtrl = formBuilder.control('', Validators.required);

    this.reservationForm = formBuilder.group({
      date: this.datePicker,
      hours: this.hoursPickerCtrl,
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.reservationForm.value);
    const data = this.reservationForm.value["date"];

    this.reservationService.isDateAvailable("2022-05-13T12:00:00Z").subscribe({
      next: (value: {available: boolean}) => {
        console.log(value);
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error.message;
      }
    })
  }
}
