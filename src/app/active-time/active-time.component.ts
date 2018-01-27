import { Component, OnInit, Input, SimpleChanges, IterableDiffers, KeyValueDiffers, DoCheck } from '@angular/core';
import { ActiveTimeService } from './active-time.service';
import { AlertState, AlertType } from '../general/alert-state';
import { Utils } from '../general/utils';
import { ServiceAdapter } from '../general/service-adapter';

@Component({
  selector: 'app-active-time',
  templateUrl: './active-time.component.html',
  styleUrls: ['./active-time.component.css']
})
export class ActiveTimeComponent implements OnInit, DoCheck {

  @Input("data") data: any;
  differ: any;
   
  isAskingForActivity: boolean = false;
  isShowingChart: boolean = false;
  alertState: AlertState = new AlertState();

  view: any[] = [700, 400];

  visualizationData;

  activities;

  constructor(private activeTimeService: ActiveTimeService, private differs: KeyValueDiffers) { 
    this.differ = differs.find({}).create();
    this.changeComponentState(ComponentState.IsAskingForActivity);
  }

  ngOnInit() {   
     
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.data);
    if (changes) {
      this.getActivityInformation();
    }
  }

  getActivityInformation(){
    this.data = this.data as Array<any>;
    this.activities = Utils.selectFromArray(this.data, "activity");
  }

  onActivityChange(event){
    this.changeComponentState(ComponentState.IsShowingChart);
    this.changeVisualizationData(event.value);
  }

  changeVisualizationData(activity: string){
    console.log("activity " + activity);
    let act = this.data.find(x => x.activity == activity);
    this.visualizationData = ServiceAdapter.parseActiveTimeInformation(act.resources);
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