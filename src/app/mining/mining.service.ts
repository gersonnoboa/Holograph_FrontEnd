import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MiningService {

  constructor(private http: HttpClient) { }

  requestFileHeaders(): Observable<HttpEvent<{}>> {
    const req = new HttpRequest("GET", "http://localhost:5000/file-headers", {
      responseType: "json"
    });

    return this.http.request(req);
  }

  requestTraces(): Observable<HttpEvent<{}>> {
    const req = new HttpRequest("GET", "http://localhost:5000/traces", {
      responseType: "json",
      reportProgress: false
    });

    return this.http.request(req);
  }
}
