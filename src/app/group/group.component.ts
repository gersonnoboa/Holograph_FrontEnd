import { Component, OnInit, DoCheck, Input, KeyValueDiffers } from '@angular/core';
import { GroupService } from './group.service';
import { Utils } from '../general/utils';
import { ServiceAdapter } from '../general/service-adapter';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, DoCheck {

  @Input("parameters") parameters: any;
  @Input("isCurrentActiveTab") isCurrentActiveTab = false;
  show = false;

  data: any;
  differ: any;

  isLoading = true;

  visualizationData = [];

  firstActivities: any;
  currentFirstActivity: any;
  currentFirstObject: any;

  secondActivities: any;
  currentSecondActivity: any;
  currentSecondObject: any;

  filteredData: any;
  
  constructor(private groupService: GroupService, private differs: KeyValueDiffers) { }

  ngOnInit() {
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.parameters);
    if (changes) {
      this.requestGroupInformation();
    }
  }

  ngOnChanges(changes: any) {
    if (changes.isCurrentActiveTab.currentValue == true && this.isLoading == false) {
      this.show = true;
    }
  }

  requestGroupInformation() {
    this.groupService.requestFlowInformation(this.parameters).subscribe(event => {
      this.isLoading = false;
      this.data = event;
      this.getGroupInformation();
    });
  }

  getGroupInformation() {
    this.data = this.data as Array<any>;
    let connections = this.data["two_sided_connections"];
    let firstElements = Utils.getUniques(Utils.selectFromArray(connections, "from_activity"));
    this.firstActivities = Utils.generateSelectFromStrings(firstElements);
    this.currentFirstActivity = Utils.getSafeFirst(this.firstActivities).value;

    let filtered = connections.filter(element => {
      return element.from_activity == this.currentFirstActivity;
    });
    let secondElements = Utils.getUniques(Utils.selectFromArray(filtered, "to_activity"));
    this.secondActivities = Utils.generateSelectFromStrings(secondElements);
    this.currentSecondActivity = Utils.getSafeFirst(this.secondActivities).value;

    this.changeVisualization();
  }  

  changeVisualization() {
    this.filteredData = this.data["two_sided_connections"].filter(element => {
      return element.from_activity == this.currentFirstActivity && element.to_activity == this.currentSecondActivity
    });

    this.visualizationData = ServiceAdapter.parseGroupInformation(this.filteredData);
    console.log(this.visualizationData);

    if (this.isCurrentActiveTab == true) {
      this.show = true;
    }
  }



  onFirstActivityChanged(event) {
    this.currentFirstActivity = event.value;
    this.getGroupInformation();
  }

  onSecondActivityChanged(event) {
    this.currentSecondActivity = event.value;
    this.changeVisualization();
  }

}
