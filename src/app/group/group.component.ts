import { Component, OnInit, DoCheck, Input, KeyValueDiffers } from '@angular/core';
import { GroupService } from './group.service';
import { Utils } from '../general/utils';
import { ServiceAdapter } from '../general/service-adapter';
import { BaseInformationComponent } from '../general/base-information.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent extends BaseInformationComponent implements OnInit, DoCheck {

  firstActivities: any;
  currentFirstActivity: any;
  currentFirstObject: any;

  secondActivities: any;
  currentSecondActivity: any;
  currentSecondObject: any;

  filteredData: any;
  
  constructor(private groupService: GroupService, private dif: KeyValueDiffers) {
    super(dif);
    this.initialLoadingFunction = this.requestGroupInformation;
   }

  requestGroupInformation() {
    this.groupService.requestGroupActivityInformation(this.parameters).subscribe(event => {
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
    this.getSecondActivityInformation();
  }  

  getSecondActivityInformation() {
    let connections = this.data["two_sided_connections"];
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

    this.showChart(ServiceAdapter.parseGroupInformation(this.filteredData));
  }

  onFirstActivityChanged(event) {
    this.currentFirstActivity = event.value;
    this.getSecondActivityInformation();
  }

  onSecondActivityChanged(event) {
    this.currentSecondActivity = event.value;
    this.changeVisualization();
  }

}
