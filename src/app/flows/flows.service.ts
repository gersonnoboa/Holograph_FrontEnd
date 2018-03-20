import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FlowsService {

  constructor(private http: HttpClient) { }

  requestFlowInformation(parameters) {
    return this.http.get(environment.url + "flows", {
      params: parameters
    });
  }
}
