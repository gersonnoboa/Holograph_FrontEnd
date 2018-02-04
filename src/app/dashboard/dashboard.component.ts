import { Component, OnInit, Input } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http/src/response';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LogType } from '../general/general';
import { AlertState, AlertType } from '../general/alert-state';
import { Utils } from '../general/utils';
import { DashboardService } from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private LogType = LogType;
  private typeChoices = Object.values(LogType).filter(e => typeof (e) == "string");
  formActiveTime: FormGroup;

  parameterOneRequestPlaceholder: string;
  parameterTwoRequestPlaceholder: string;
  shouldShowParameterTwo: boolean;

  isLoading: boolean;
  isAskingForFields: boolean;
  isShowingInformation: boolean;
  alertState: AlertState = new AlertState();

  headers: Array<String>;

  data: Array<any>;

  constructor(private miningService: MiningService, private fb: FormBuilder, private dashboardService: DashboardService) {
    this.changeComponentState(ComponentState.Loading);

    this.formActiveTime = fb.group({
      "caseID": "",
      "resource": "",
      "activity": "",
      "type": LogType.ActiveTime,
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
        this.changeComponentState(ComponentState.AskingForFields);
        this.headers = event.body as Array<String>;
        this.subscribeToLogTypeChanges();
        this.showAppropriateParameters(LogType.ActiveTime);
      }
    },
      error => {
        this.changeComponentState(ComponentState.None);
        if (error instanceof HttpErrorResponse) {
          console.log(error.message);
        }

        this.showAlert();
      });
  }

  onSubmitClicked() {
    this.changeComponentState(ComponentState.Loading);
    this.requestActiveTimeInformation();
    this.requestTraceInformation();
  }

  requestTraceInformation() {
    this.dashboardService.requestTracesInformation(this.formActiveTime.value).subscribe(event => {
      console.log(event);
    },
      error => {
        this.changeComponentState(ComponentState.AskingForFields);
        if (error instanceof HttpErrorResponse) {
          console.log(error.message);
        }
        this.showAlert();
      });
  }

  requestActiveTimeInformation() {
    this.dashboardService.requestActiveTimeInformation(this.formActiveTime.value).subscribe(event => {
      this.changeComponentState(ComponentState.ShowingActiveTime);
      this.showActiveTimeInformation(event);
    },
      error => {
        this.changeComponentState(ComponentState.AskingForFields);
        if (error instanceof HttpErrorResponse) {
          console.log(error.message);
        }
        this.showAlert();
      });
  }

  onSubmiTestClicked(){
    this.formActiveTime = this.fb.group({
      "caseID": "Case ID",
      "resource": "Resource",
      "activity": "Activity",
      "type": LogType.StartAndEndDate,
      "parameterOne": "StartTime",
      "parameterTwo": "EndTime"
    });
    this.onSubmitClicked();
  }

  showActiveTimeInformation(information: any) {
    let activities = Utils.selectFromArray(information, "activity");
    this.data = information;
  }

  subscribeToLogTypeChanges() {
    this.formActiveTime.get("type").valueChanges.subscribe((value) => {
      this.showAppropriateParameters(value);
    });
  }

  changeComponentState(state: ComponentState) {
    this.isLoading = false;
    this.isAskingForFields = false;
    this.isShowingInformation = false;

    switch (state) {
      case ComponentState.Loading:
        this.isLoading = true;
        break;
      case ComponentState.AskingForFields:
        this.isAskingForFields = true;
        break;
      case ComponentState.ShowingActiveTime:
        this.isShowingInformation = true;
        break;

      case ComponentState.None:
      default:
        break;
    }
  }

  showAppropriateParameters(type: LogType) {
    this.shouldShowParameterTwo = (type == LogType.StartAndEndDate);

    switch (type) {
      case LogType.ActiveTime:
        this.parameterOneRequestPlaceholder = "Active Time";
        break;
      case LogType.StartAndEndDate:
        this.parameterOneRequestPlaceholder = "Start Time";
        this.parameterTwoRequestPlaceholder = "End Time";
        break;
      case LogType.Timestamp:
        this.parameterOneRequestPlaceholder = "Timestamp";
        break;
      default:
        break;
    }

  }

  showAlert() {
    this.alertState.showAlert(AlertType.Danger, "An error has occurred. Please try again later.");
  }

}

enum ComponentState {
  None,
  Loading,
  AskingForFields,
  ShowingActiveTime
}