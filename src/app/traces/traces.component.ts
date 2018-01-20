import { Component, OnInit } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.css']
})
export class TracesComponent implements OnInit {

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
        console.log("success trace" + event.body);
        
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
