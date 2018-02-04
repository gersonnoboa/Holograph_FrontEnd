import { Component, OnInit, Input } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.css']
})
export class TracesComponent implements OnInit {

  @Input("data") data: any;
  
  formTraces: FormGroup;
  isLoading: boolean;

  constructor(private miningService: MiningService, private fb: FormBuilder) { 
    this.isLoading = true;

    this.formTraces = fb.group ({
      "resource": "",
      "caseID": ""
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.miningService.requestFileHeaders().subscribe(event => {
      if (event instanceof HttpResponse) {
        this.isLoading = false;
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
