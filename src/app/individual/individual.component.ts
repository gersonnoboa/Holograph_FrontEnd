import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';
import { IndividualService } from './individual.service';
import { Utils } from '../general/utils';
import { ServiceAdapter } from '../general/service-adapter';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit, DoCheck {

  @Input("parameters") parameters: any;
  @Input("isCurrentActiveTab") isCurrentActiveTab = false;
  show = false;

  differ: any;

  isLoading = true;

  data: any;
  variants: any;
  activities: any;
  chartData: any = [];

  currentVariant = 0;
  currentActivity = 0;

  IndividualType = IndividualType;
  individualTypeChoices = Object.values(IndividualType).filter(e => typeof (e) == "string");
  currentIndividualType = IndividualType.Initial;
  
  constructor(private differs: KeyValueDiffers, private individualService: IndividualService) { }

  ngOnInit() {
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.parameters);
    if (changes) {
      this.requestIndividualInformation();
    }
  }

  requestIndividualInformation() {
    this.individualService.requestIndividualInformation(this.parameters).subscribe(event => {
      this.isLoading = false;
      this.data = event;
      this.getResourceInformation();
    }, error => {
      console.log(error);
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
    this.chartData = ServiceAdapter.parseIndividualInformation(selectedType[this.currentActivity]);
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

  ngOnChanges(changes: any) {
    if (changes.isCurrentActiveTab.currentValue == true && this.isLoading == false) {
      this.show = true;
      console.log("fuck individual");
    }
  }

}

enum IndividualType {
  Initial = "initial",
  Middle = "middle",
  Final = "final"
}