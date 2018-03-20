import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TracesService {

  constructor(private http: HttpClient) { }

  requestTracesInformation(parameters) {
    return this.http.get(environment.url + "traces", {
      params: parameters
    });
  }
}
