import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';

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

  isLoading = false;

  constructor(private differs: KeyValueDiffers) { }

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
    
  }

  ngOnChanges(changes: any) {
    if (changes.isCurrentActiveTab.currentValue == true && this.isLoading == false) {
      this.show = true;
    }
  }

}
