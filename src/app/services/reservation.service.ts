import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url = environment.baseUrl + 'resource/';

  constructor(private http: HttpClient) { }

  isDateAvailable(date: any): Observable<any> {
    return this.http.get<any>(this.url + '1337/available?datetime=' + date);
  }
}
