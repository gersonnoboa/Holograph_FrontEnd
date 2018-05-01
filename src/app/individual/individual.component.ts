import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';
import { IndividualService } from './individual.service';
import { Utils } from '../general/utils';
import { ServiceAdapter } from '../general/service-adapter';
import { BaseInformationComponent } from '../general/base-information.component';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent extends BaseInformationComponent implements OnInit, DoCheck {

  variants: any;
  activities: any;

  currentVariant = 0;
  currentActivity = 0;

  IndividualType = IndividualType;
  individualTypeChoices = Object.values(IndividualType).filter(e => typeof (e) == "string");
  currentIndividualType = IndividualType.Initial;
  
  constructor(private dif: KeyValueDiffers, private individualService: IndividualService) { 
    super(dif);
    this.initialLoadingFunction = this.requestIndividualInformation;
  }

  requestIndividualInformation() {
    this.individualService.requestIndividualInformation(this.parameters).subscribe(event => {
      this.isLoading = false;
      this.data = event;
      this.getResourceInformation();
    }, error => {
    });
  }

  getResourceInformation(){
    this.data = this.data as Array<any>;
    
    this.variants = Utils.getVariantInfoForSelect(this.data);
    this.currentVariant = this.variants.length > 0 ? this.variants[0].value : 0;
    this.getActivityInformation();
  }

  getActivityInformation(){
    let selectedVariant = this.data[this.currentVariant];
    let selectedType = selectedVariant[this.currentIndividualType];

    this.activities = Utils.getActivityInfoForSelect(selectedType);
    this.changeVisualization(selectedType);
  }

  changeVisualization(selectedType){
    this.showChart(ServiceAdapter.parseIndividualInformation(selectedType[this.currentActivity]));
  }

  onIndividualTypeChange(event){
    this.currentActivity = 0;
    this.currentIndividualType = event.value;
    this.getActivityInformation();
  }

  onVariantChange(event) {
    this.currentActivity = 0;
    this.currentIndividualType = IndividualType.Initial;
    this.currentVariant = event.value;
    this.getActivityInformation();
  }

  onActivityChange(event) {
    this.currentActivity = event.value;
    this.getActivityInformation();
  }
}

enum IndividualType {
  Initial = "initial",
  Middle = "middle",
  Final = "final"
}