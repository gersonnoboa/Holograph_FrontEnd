import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogType } from '../general/general'
import { environment } from '../../environments/environment';

@Injectable()
export class ActiveTimeService {

  constructor(private http: HttpClient) { }

  requestActiveTimeInformation(parameters) {
    return this.http.get(environment.url + "active-time", {
      params: parameters
    });
  }
}
