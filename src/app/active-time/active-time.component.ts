import { Component, OnInit, Input } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http/src/response';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActiveTimeService } from './active-time.service';
import { LogType } from '../general/general';

@Component({
  selector: 'app-active-time',
  templateUrl: './active-time.component.html',
  styleUrls: ['./active-time.component.css']
})
export class ActiveTimeComponent implements OnInit {

  private LogType = LogType;
  private typeChoices = Object.values(LogType).filter(e => typeof (e) == "string");
  formActiveTime: FormGroup;

  parameterOneRequestPlaceholder: string;
  parameterTwoRequestPlaceholder: string;
  shouldShowParameterTwo: boolean;

  isLoading: boolean;
  headers: Array<String>;

  constructor(private miningService: MiningService, private fb: FormBuilder, private activeTimeService: ActiveTimeService) { 
    this.isLoading = true;

    this.formActiveTime = fb.group({
      "resource": "",
      "type": LogType.HasActiveTime,
      "parameterOne": "",
      "parameterTwo": ""
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.miningService.requestFileHeaders().subscribe(event => {
      if (event instanceof HttpResponse) {
        this.isLoading = false;
        this.headers = event.body as Array<String>;
        this.subscribeToLogTypeChanges(); 
        this.showAppropriateParameters(LogType.HasActiveTime);
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

  subscribeToLogTypeChanges() {
    this.formActiveTime.get("type").valueChanges.subscribe((value) => {
      console.log(value);
      this.showAppropriateParameters(value);
    });
  }

  showAppropriateParameters(type: LogType) {
    this.shouldShowParameterTwo = (type == LogType.HasStartAndEndDate);
    
    switch (type) {
      case LogType.HasActiveTime:
        this.parameterOneRequestPlaceholder = "Active time";
        break;
      case LogType.HasStartAndEndDate:
        this.parameterOneRequestPlaceholder = "Start time";
        this.parameterTwoRequestPlaceholder = "End time";
        break;
      case LogType.HasTimestamp:
        this.parameterOneRequestPlaceholder = "Timestamp";
        break;
      default:
        console.log("goes to default");
        break;
    }

  }

  onSubmitClicked(){
    console.log("form submitted");
    console.log(this.formActiveTime);
    console.log(this.formActiveTime.value);
    this.activeTimeService.requestActiveTimeInformation(this.formActiveTime.value).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log(event.body);
      }
    },
    error => {
      if (error instanceof HttpErrorResponse) {
        console.log(error.message);
      }
    });
  }

}