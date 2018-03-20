import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogType } from '../general/general'
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  requestFileHeaders(fileID: string): Observable<any> {
    let params = {
      "fileID": fileID
    }
    return this.http.get(environment.url + "file-headers", {
      params: params
    });
  }

}
