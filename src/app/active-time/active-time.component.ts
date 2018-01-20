import { Component, OnInit } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http/src/response';

@Component({
  selector: 'app-active-time',
  templateUrl: './active-time.component.html',
  styleUrls: ['./active-time.component.css']
})
export class ActiveTimeComponent implements OnInit {

  isLoading: boolean;

  constructor(private miningService: MiningService) { 
    this.isLoading = true;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.miningService.requestActiveTime().subscribe(event => {
      if (event instanceof HttpResponse) {
        this.isLoading = false;
        console.log("success active time" + event.body);
        
      }
    },
    error => {
      this.isLoading = false;
      console.log("error");
      if (error instanceof HttpErrorResponse) {
        console.log(error.message);
      }
      
    });
  }

}
