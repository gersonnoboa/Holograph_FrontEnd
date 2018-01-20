import { Component, OnInit, Input } from '@angular/core';
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
  headers: Array<String>;
  @Input('typeOfLog') typeOfLog: String;

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
        console.log("success active time");
        console.log(event.body);
        this.headers = event.body as Array<String>;
        
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
