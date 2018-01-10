import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent {

  errors: Array<string> =[];
  dragAreaClass: string = 'dragarea';
  @Input() fileExt: string = "CSV, XES, MXML, TXT";
  @Input() maxFiles: number = 5;
  @Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();
  uploadText;
  isSuccessfulFileUploaded = false;
  isWrongFileUploaded = false;

  constructor() {
    this.uploadText = UploadTextStateTexts.Default;
  }

  saveFiles(files){
    this.errors = [];
    
    let isValidFormat = this.isValidFormat(files);

    if (isValidFormat) {
      this.isSuccessfulFileUploaded = true;
      this.isWrongFileUploaded = false;
    }
    else {
      this.isWrongFileUploaded = true;
      this.isSuccessfulFileUploaded = false;
    } 
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

  private getFilesFromEvent(event): FileList {
    if (!event) return null;
    return event.dataTransfer.files;
  }

  private isValidFormat(files): boolean {
    if (!files) return false;

    let firstFile = files[0];
    let name: string = firstFile.name;
    let filenameParts = name.split(".");
    let lastPart = filenameParts[filenameParts.length - 1];

    console.log("Extension:", lastPart);
    return this.fileExt.includes(lastPart.toUpperCase());
  }


}

enum UploadTextStateTexts{
  Default = "Drag and drop to upload your file",
  FileOnTop = "Release your file",
  CorrectFileReleased = ""
};