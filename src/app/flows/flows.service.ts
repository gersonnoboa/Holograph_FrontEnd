import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlowsService {

  constructor(private http: HttpClient) { }

  requestFlowInformation(parameters) {
    return this.http.get("http://localhost:5000/flows", {
      params: parameters
    });
  }
}
