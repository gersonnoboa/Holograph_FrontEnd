import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogType } from '../general/general'

@Injectable()
export class ActiveTimeService {

  constructor(private http: HttpClient) { }

  requestActiveTimeInformation(parameters) {
    return this.http.post("http://localhost:5000/active-time", parameters);
  }
}
