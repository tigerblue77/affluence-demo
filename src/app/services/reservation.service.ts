import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url = environment.baseUrl + 'resource/1337/available';

  constructor(private http: HttpClient) { }

  isDateAvailable(date: string): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('datetime', date);

    return this.http.get<any>(this.url, {params: httpParams});
  }
}
