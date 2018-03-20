import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
  	let formData = new FormData();
  	formData.append('file', file);
	  const req = new HttpRequest("POST", environment.url + "upload", formData, {
  		reportProgress: true,
  		responseType: "text"
  	});

  	return this.http.request(req);
  }
}
