import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class IndividualService {

  constructor(private http: HttpClient) { }

  requestIndividualInformation(parameters) {
    return this.http.get(environment.url + "individual", {
      params: parameters
    });
  }

}
