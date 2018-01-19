import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
  	let formData = new FormData();
  	formData.append('file', file);
	console.log("File: " + file.name);
  	const req = new HttpRequest("POST", "http://localhost:5000/upload", formData, {
  		reportProgress: true,
  		responseType: "text"
  	});

  	return this.http.request(req);
  }
}
