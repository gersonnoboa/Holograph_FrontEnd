import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FileUploadService } from './file-upload/file-upload.service';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    FileUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
