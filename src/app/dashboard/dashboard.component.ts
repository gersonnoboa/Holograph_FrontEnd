import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http/src/response';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LogType } from '../general/general';
import { AlertState, AlertType } from '../general/alert-state';
import { Utils } from '../general/utils';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';


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
  firstLine: Array<String>;

  fileID: string;

  parameters: any;

  private sub: any;

  isActive1 = false;
  isActive2 = false;
  isActive3 = false;
  isActive4 = false;
  isActive5 = false;
  isActive6 = false;

  tabSelectedIndex = 0;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService, private route: ActivatedRoute) {
    this.changeComponentState(ComponentState.Loading);

    this.formActiveTime = fb.group({
      "fileID": "",
      "caseID": "",
      "resource": "",
      "activity": "",
      "type": LogType.ActiveTime,
      "parameterOne": "",
      "parameterTwo": "",
      "dateTimeFormat": ""
    });
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.fileID = params['id'];
      this.getData();
    });
    
  }

  getData() {
    this.dashboardService.requestFileHeaders(this.fileID).subscribe(response => {
      this.changeComponentState(ComponentState.AskingForFields);
      this.headers = (response as Array<Array<String>>)[0];
      this.firstLine = (response as Array<Array<String>>)[1];
      this.subscribeToLogTypeChanges();
      this.showAppropriateParameters(LogType.ActiveTime);
    }, error => {
    });
  }

  onSubmitClicked() {
    this.changeComponentState(ComponentState.Loading);
    this.formActiveTime.patchValue({ "fileID": this.fileID });
    this.changeComponentState(ComponentState.ShowingActiveTime);
    this.parameters = this.formActiveTime.value;
  }

  onSubmiTestClicked(){
    // this.formActiveTime = this.fb.group({
    //   "fileID": "915d36c2-9500-4e9d-86a6-c106a2ac02db.csv",
    //   "caseID": "Case ID",
    //   "resource": "Resource",
    //   "activity": "Activity",
    //   "type": LogType.StartAndEndDate,
    //   "parameterOne": "StartTime",
    //   "parameterTwo": "EndTime"
    // });
    this.formActiveTime = this.fb.group({
      "fileID": "18b9dee2-a0b6-4d4c-a3bf-1f512f3a18ab.csv",
      "caseID": "Case ID",
      "resource": "Resource",
      "activity": "Activity",
      "type": LogType.StartAndEndDate,
      "parameterOne": "Start Date",
      "parameterTwo": "End Date",
      "dateTimeFormat": "dd.MM.yy HH:mm"
    });
    this.onSubmitClicked();
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

  selectedTabChange($event){
    this.isActive1 = false;
    this.isActive2 = false;
    this.isActive3 = false;
    this.isActive4 = false;
    this.isActive5 = false;
    this.isActive6 = false;
  }

  animationDone() {
    switch (this.tabSelectedIndex) {
      case 0:
        this.isActive4 = true;
        break;
      case 1:
        this.isActive5 = true;
        break;
      case 2:
        this.isActive6 = true;
        break;
      case 3:
        this.isActive1 = true;
        break;
      case 4:
        this.isActive2 = true;
        break;
      case 5:
        this.isActive3 = true;
        break;
      default:
        break;
    }
  }
}

enum ComponentState {
  None,
  Loading,
  AskingForFields,
  ShowingActiveTime
}