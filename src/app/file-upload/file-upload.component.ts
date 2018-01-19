import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { FileUploadService } from './file-upload.service';
import { AlertState, AlertType } from '../general/alert-state';
import { Router } from '@angular/router';
import { error } from 'util';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent {

  dragAreaClass: string = 'dragarea';
  private fileExt: string = "CSV, XES, MXML, TXT, XML";
  uploadText = "";
  alertState: AlertState;

  constructor(private fileUploadService: FileUploadService, private router: Router) {
    this.uploadText = UploadTextStateTexts.Default;
    this.alertState = new AlertState();
    this.changeToState(UploadState.Start);
  }

  saveFiles(files){

    let isValidFormat = this.isValidFormat(files);

    if (isValidFormat) {
      this.changeToState(UploadState.CorrectFileDropped);
      this.uploadFile(files[0]);
    }
    else {
      this.changeToState(UploadState.IncorrectFileDropped);
    }
  }

  private isValidFormat(files): boolean {
    if (!files) return false;

    let firstFile = files[0];
    let name: string = firstFile.name;
    let filenameParts = name.split(".");
    let lastPart = filenameParts[filenameParts.length - 1];

    return this.fileExt.includes(lastPart.toUpperCase());
  }

  private uploadFile(file: File) {
  	this.fileUploadService.uploadFile(file).subscribe(event => {
      console.log(event.type);
      if (event.type === HttpEventType.UploadProgress) {
        //console.log(Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        if (event.status == 200) {
          this.changeToState(UploadState.SuccessfulUpload);
          this.redirectToActiveTime();
        }
        else {
          this.changeToState(UploadState.UnsuccessfulUpload);
        }
      }
    },
    error => {
      this.changeToState(UploadState.UnsuccessfulUpload);
    });
  }

  changeToState(state: UploadState) {
    switch (state) {
      case UploadState.Start:
        this.alertState.hideAlert();
        break;
      case UploadState.IncorrectFileDropped:
        this.alertState.showAlert(AlertType.Danger, "File extension is incorrect. Please upload a file with a correct extension.");
        break;
      case UploadState.CorrectFileDropped:
        this.alertState.showAlert(AlertType.Success, "Uploading file. Please wait...");
        break;
      case UploadState.SuccessfulUpload:
        this.alertState.showAlert(AlertType.Success, "The file upload was successful. Please wait while we mine the file...");
        break;
      case UploadState.UnsuccessfulUpload:
        this.alertState.showAlert(AlertType.Danger, "The file upload failed. Please try again later.");
        break;
      default:
        break;
    }
  }

  private redirectToActiveTime() {
    this.router.navigateByUrl("/dashboard/active-time");
  }

  onFileChange(event){
    let files = event.target.files;
    this.saveFiles(files);
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.uploadText = UploadTextStateTexts.FileOnTop;
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.uploadText = UploadTextStateTexts.FileOnTop;
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.uploadText = UploadTextStateTexts.Default;
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.uploadText = UploadTextStateTexts.Default;
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this.uploadText = UploadTextStateTexts.Default;
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    var files = event.dataTransfer.files;
    this.saveFiles(files);
  }

}

enum UploadTextStateTexts{
  Default = "Drag and drop to upload your file",
  FileOnTop = "Release your file",
  CorrectFileReleased = ""
};

enum UploadState {
  Start,
  IncorrectFileDropped,
  CorrectFileDropped,
  SuccessfulUpload,
  UnsuccessfulUpload
}