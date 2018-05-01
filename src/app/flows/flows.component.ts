import { Component, OnInit, Input, KeyValueDiffers, SimpleChanges, DoCheck } from '@angular/core';
import { FlowsService } from './flows.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Utils } from '../general/utils';
import { VariantSelectInfo, SelectInfo } from '../general/general';
import { ServiceAdapter, FlowsVisualizationType } from '../general/service-adapter';
import { BaseInformationComponent } from '../general/base-information.component';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css']
})
export class FlowsComponent extends BaseInformationComponent implements OnInit, DoCheck {

  variants: any;
  currentVariant: any;
  textVariant = "None";
  isLoading = true;

  activities: any;
  currentActivity: any;

  currentVisualization: FlowsVisualizationType = FlowsVisualizationType.TimeAfter;

  private FlowsVisualizationType = FlowsVisualizationType;
  private chartTypeChoices = Object.values(FlowsVisualizationType).filter(e => typeof (e) == "string");

  constructor(private flowsService: FlowsService, private dif: KeyValueDiffers) { 
    super(dif);
    this.initialLoadingFunction = this.requestFlowsInformation;
  }

  requestFlowsInformation() {
    this.flowsService.requestFlowInformation(this.parameters).subscribe(event => {
      this.isLoading = false;
      this.data = event;
      this.getFlowsInformation();
    }, error => {
    });
  }

  getFlowsInformation() {
    this.data = this.data as Array<any>;
    this.variants = Utils.getVariantInfoForSelect(this.data);

    if (this.variants.length > 0) {
      this.currentVariant = this.variants[0].value;
    }

    this.getActivitiesInformation();
  }

  getActivitiesInformation() {
    let variantValue = this.currentVariant;
    let variant = this.data[variantValue];
    let activityList = variant.activity_list;

    var temporalActivities = [];
    for (let index = 0; index < activityList.length; index++) {
      let text = activityList[index];
      let selectInfo = new SelectInfo(index, text);
      temporalActivities.push(selectInfo);
    }

    this.activities = temporalActivities;
    if (this.activities.length > 0) {
      this.currentActivity = this.activities[0].value;
    }

    this.changeVisualizationData();
  }


  onActivityChange(event) {
    this.currentActivity = event.value;
    this.changeVisualizationData();
  }

  onVariantChange(event) {
    this.currentVariant = event.value;
    this.getActivitiesInformation();
  }

  onChartTypeChange(event) {
    this.currentVisualization = event.value;
    this.changeVisualizationData();
  }

  changeVisualizationData(){
    if (this.data != null) {
      let variant = this.data[this.currentVariant];

      let activities = variant["activity_list"];
      let temporalTextVariant = "";

      for (let index = 0; index < activities.length; index++) {
        const element = activities[index];
        let ending = (index == activities.length - 1) ? "" : " > ";
        temporalTextVariant += element + ending;
      }

      this.textVariant = temporalTextVariant;
      this.showChart(ServiceAdapter.parseFlowsInformation(variant.statistics, this.currentActivity, this.currentVisualization));
    }
  }

}