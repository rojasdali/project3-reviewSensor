import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';

@Injectable()

// this service is intended to grab information from a component and pass it to another
export class DataService {
    dataFromService;
    constructor() {}

    handleError(e) {
        return Observable.throw(e.json().message);
      }

}
