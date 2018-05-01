import { Component, OnInit, Input, KeyValueDiffers, SimpleChanges, DoCheck } from '@angular/core';
import { MiningService } from '../mining/mining.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Utils } from '../general/utils';
import { ServiceAdapter } from '../general/service-adapter';
import { TracesService } from './traces.service';
import { VariantSelectInfo } from '../general/general';
import { BaseInformationComponent } from '../general/base-information.component';

@Component({
  selector: 'app-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.css']
})
export class TracesComponent extends BaseInformationComponent implements OnInit, DoCheck {

  variants: Array<VariantSelectInfo>;
  currentVariant: number;
  textVariant = "None";
  maxChartData: number = 100;

  specificResourcesInformation: Array<SpecificResourceInformation>;
  factsInformation: Array<Fact>;

  constructor(private tracesService: TracesService, private dif: KeyValueDiffers) { 
    super(dif);
    this.initialLoadingFunction = this.requestTraceInformation;
  }

  requestTraceInformation() {
    this.tracesService.requestTracesInformation(this.parameters).subscribe(event => {
      this.isLoading = false;
      this.data = event;
      this.getActivityInformation();
    },
      error => {
      });
  }

  getActivityInformation() {
    this.data = this.data as Array<any>;
    this.variants = Utils.getVariantInfoForSelect(this.data);

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
      this.getResourceInformation(variant);
      this.getFactInformation(variant);
    }
  }

  getFactInformation(variant) {
    let temporalFactInformation = [];
    let factInformation = variant["facts"];

    factInformation.forEach(element => {
      let fact = new Fact();
      fact.name = element["name"];
      fact.value = element["value"];
      fact.elements = this.formatElements(element["elements"]);
      temporalFactInformation.push(fact);
    });

    this.factsInformation = temporalFactInformation;
  }

  getResourceInformation(variant) {
    let resourceInformation = variant["resources"];
    let temporalResourceInformation = [];

    let temporalChartData = [];

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

      temporalChartData.push(ServiceAdapter.parseTraceInformation(info));
    }); 
    
    this.showChart(temporalChartData);
    this.specificResourcesInformation = temporalResourceInformation;
    this.maxChartData = this.getMaxValue(temporalChartData);
  }

  getMaxValue(data) {
    return Math.max.apply(Math, data.map(function (o) { return o.value ; }))
  }

  formatElements(elements: Array<string>) {
    let returningString = "";

    if (elements.length == 0) {
      returningString = "None";
    }
    if (elements.length == 1) {
      returningString = elements[0];
    }
    else {
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if (index == 0) {
          returningString += element;
        }
        else if (index == elements.length - 1) {
          returningString += " and " + element;
        }
        else {
          returningString += ", " + element;
        }
      }
    }

    return returningString;
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

class Fact {
  elements: string;
  name: string;
  value: number;

  /*constructor(name: string, value: number, elements: Array<string>){
    this.name = name;
    this.value = value;
    this.elements = elements;
  }*/
}