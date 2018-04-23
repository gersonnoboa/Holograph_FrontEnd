import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) { }

  requestFlowInformation(parameters) {
    return this.http.get(environment.url + "group-activity", {
      params: parameters
    });
  }
}
