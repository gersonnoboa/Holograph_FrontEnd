import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) { }

  requestGroupActivityInformation(parameters) {
    return this.http.get(environment.url + "group-activity", {
      params: parameters
    });
  }

  requestGroupResourceInformation(parameters) {
    return this.http.get(environment.url + "group-resource", {
      params: parameters
    });
  }
}
