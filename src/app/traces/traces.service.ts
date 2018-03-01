import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TracesService {

  constructor(private http: HttpClient) { }

  requestTracesInformation(parameters) {
    return this.http.get("http://localhost:5000/traces", {
      params: parameters
    });
  }
}
