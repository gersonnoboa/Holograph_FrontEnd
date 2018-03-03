import { Component, OnInit, Input, SimpleChanges, IterableDiffers, KeyValueDiffers, DoCheck } from '@angular/core';
import { ActiveTimeService } from './active-time.service';
import { AlertState, AlertType } from '../general/alert-state';
import { Utils } from '../general/utils';
import { ServiceAdapter, ActiveTimeVisualizationType } from '../general/service-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-active-time',
  templateUrl: './active-time.component.html',
  styleUrls: ['./active-time.component.css']
})
export class ActiveTimeComponent implements OnInit, DoCheck {

  private ActiveTimeVisualizationType = ActiveTimeVisualizationType;
  private visualizationChoices = Object.values(ActiveTimeVisualizationType).filter(e => typeof (e) == "string");

  private ChartType = ChartType;
  private chartTypeChoices = Object.values(ChartType).filter(e => typeof (e) == "string");

  @Input("parameters") parameters: any;
  data: any;
  differ: any;
   
  isAskingForActivity: boolean = false;
  isShowingChart: boolean = false;
  alertState: AlertState = new AlertState();

  visualizationData = [];

  activities: Array<string>;

  currentActivity;
  currentVisualization = ActiveTimeVisualizationType.Average;
  currentChartType = ChartType.Bar;

  isLoading = true;

  constructor(private activeTimeService: ActiveTimeService, private differs: KeyValueDiffers) { 
    
  }

  ngOnInit() {   
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.parameters);
    if (changes) {
      this.requestActiveTimeInformation();
    }
  }

  requestActiveTimeInformation() {
    this.activeTimeService.requestActiveTimeInformation(this.parameters).subscribe(event => {
      this.isLoading = false;
      this.data = event;
      this.getActivityInformation();
    },
      error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error.message);
        }
        this.showAlert();
      });
  }

  getActivityInformation(){
    this.data = this.data as Array<any>;
    this.activities = Utils.selectFromArray(this.data, "activity");
    if (this.activities.length > 0) {
      this.currentActivity = this.activities[0];
      this.changeComponentState(ComponentState.IsShowingChart);
      this.changeVisualizationData();
    }
  }

  onActivityChange(event){
    this.changeComponentState(ComponentState.IsShowingChart);
    this.currentActivity = event.value;
    this.changeVisualizationData();
  }
  
  onVisualizationChange(event){
    this.currentVisualization = event.value;
    this.changeVisualizationData();
  }

  onChartTypeChange(event){
    this.currentChartType = event.value;
  }

  changeVisualizationData(){
    let act = this.data.find(x => x.activity == this.currentActivity);
    this.visualizationData = ServiceAdapter.parseActiveTimeInformation(act.resources, this.currentVisualization);
  }

  changeComponentState(state: ComponentState) {

    switch (state) {
      case ComponentState.IsShowingChart:
        this.isShowingChart = true;
      case ComponentState.IsAskingForActivity:
        this.isAskingForActivity = true;
        break;
      default:
        break;
    }
  }

  showAlert(){
    this.alertState.showAlert(AlertType.Danger, "An error has occurred. Please try again later.");
  }
}

enum ComponentState {
  IsAskingForActivity,
  IsShowingChart
}

enum ChartType {
  Bar = "Bar",
  Pie = "Pie",
  AdvancedPie = "Advanced Pie",
  PieGrid = "Pie Grid",
  NumberCards = "Number Cards"
}