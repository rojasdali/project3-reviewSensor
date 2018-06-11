import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

// service grabs info from watson api
@Injectable()
export class CrudService {
  constructor(private http: Http) { }
  handleError(e) {
    return Observable.throw(e.json().message);
  }

  createTrip(chosenHotel) {
      return this.http.post(`${environment.apiUrl}/crud/create/trip`, chosenHotel)
      .map((responseFromApi) => responseFromApi.json());
  }

  updateTrip(tripId, updates) {
    return this.http.post(`${environment.apiUrl}/crud/trip/update/${tripId}`, updates)
    .map((responseFromApi) => responseFromApi.json());
  }

  deleteTrip(tripId) {
    return this.http.post(`${environment.apiUrl}/crud/trip/delete/${tripId}`, {})
    .map((responseFromApi) => responseFromApi.json());
  }

}
