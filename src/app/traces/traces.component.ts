import { Component, OnInit, Input, KeyValueDiffers } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Utils } from '../general/utils';

@Component({
  selector: 'app-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.css']
})
export class TracesComponent implements OnInit {

  @Input("data") data: any;
  
  differ: any;

  variants: Array<VariantSelectInfo>;
  currentVariant: number;
  textVariant = "None";

  specificResourcesInformation: Array<SpecificResourceInformation>;

  constructor(private differs: KeyValueDiffers) { 
  }

  ngOnInit() {
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.data);
    if (changes) {
      this.getActivityInformation();
    }
  }

  getActivityInformation() {
    this.data = this.data as Array<any>;

    let temporalVariants = [];

    let activityList = Utils.selectFromArray(this.data, "activity_list");

    for (let index = 0; index < activityList.length; index++) {
      let variantNumber = index + 1;
      let activitiesCount = activityList.length;
      let activitiesText = activitiesCount == 1 ? "activity" : "activities";
      let text = `Variant ${variantNumber} (${activitiesCount} ${activitiesText})`;

      let info = new VariantSelectInfo(index, text);
      temporalVariants.push(info);
    }

    this.variants = temporalVariants;

    if (this.variants.length > 0) {
      this.currentVariant = this.variants[0].value;
      this.changeVisualizationData();
    }
  }

  onVariantChange(event) {
    this.currentVariant = event.value;
    this.changeVisualizationData();
  }

  changeVisualizationData() {
    let variant = this.data[this.currentVariant];
    let activities = variant["activity_list"];
    let temporalTextVariant = "";

    for (let index = 0; index < activities.length; index++) {
      const element = activities[index];
      let ending = (index == activities.length - 1) ? "" : " > ";
      temporalTextVariant += element + ending;
    }

    this.textVariant = temporalTextVariant;
    this.getResourceInformation(variant);
  }

  getResourceInformation(variant) {
    let resourceInformation = variant["resources"];
    let temporalResourceInformation = [];
    resourceInformation.forEach(element => {
      let info = new SpecificResourceInformation();
      info.name = element["name"];
      info.minimumTimeWith = element["minimum_time_with"];
      info.minimumTimeWithout = element["minimum_time_without"];
      info.maximumTimeWith = element["maximum_time_with"];
      info.maximumTimeWithout = element["maximum_time_without"];
      info.averageTimeWith = element["average_time_with"];
      info.averageTimeWithout = element["average_time_without"];
      temporalResourceInformation.push(info);
    });

    this.specificResourcesInformation = temporalResourceInformation;
  }

  getData() {
    /*this.miningService.requestFileHeaders().subscribe(event => {
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
      
    });*/
  }

}

class VariantSelectInfo {
  value: number;
  text: string;

  constructor(value: number, text: string) {
    this.value = value;
    this.text = text;
  }
}

class TotalResourceInformation {
  averageTime: number;
  maximumTime: number;
  minimumTime: number;
}

class SpecificResourceInformation {
  name: string;
  averageTimeWith: number;
  averageTimeWithout: number;
  maximumTimeWith: number;
  maximumTimeWithout: number;
  minimumTimeWith: number;
  minimumTimeWithout: number;
}