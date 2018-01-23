import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogType } from '../general/general'

@Injectable()
export class ActiveTimeService {

  constructor(private http: HttpClient) { }

  requestActiveTimeInformation(parameters) {
    let formData = new FormData();
    formData.append('parameters', parameters);
    const req = new HttpRequest("POST", "http://localhost:5000/active-time", formData, {
      responseType: "json"
    });

    return this.http.request(req);
  }
}
