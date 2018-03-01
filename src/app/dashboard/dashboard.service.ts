import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogType } from '../general/general'

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  requestFileHeaders(fileID: string): Observable<any> {
    let params = {
      "fileID": fileID
    }
    return this.http.get("http://localhost:5000/file-headers", {
      params: params
    });
  }

  requestFlowInformation(parameters) {
    return this.http.get("http://localhost:5000/flows", {
      params: parameters
    });
  }

}
