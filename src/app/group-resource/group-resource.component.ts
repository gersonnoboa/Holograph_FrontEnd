import { Component, OnInit, KeyValueDiffers, DoCheck, Input } from '@angular/core';
import { GroupService } from '../group/group.service';
import { BaseInformationComponent } from '../general/base-information.component';
import { Utils } from '../general/utils';

@Component({
  selector: 'app-group-resource',
  templateUrl: './group-resource.component.html',
  styleUrls: ['./group-resource.component.css']
})
export class GroupResourceComponent extends BaseInformationComponent implements OnInit, DoCheck {

  resources: any;
  currentResource: any;

  constructor(private groupService: GroupService, private dif: KeyValueDiffers) { 
    super(dif);
    this.initialLoadingFunction = this.requestGroupResourceInformation;
  }

  requestGroupResourceInformation() {
    this.groupService.requestGroupResourceInformation(this.parameters).subscribe(event => {
      this.isLoading = false;
      this.data = event;
      this.getGroupInformation();
    });
  }

  getGroupInformation() {
    this.data = this.data as Array<any>;
    let res = this.data["resources"];
    this.resources = Utils.getInfoForSelect(res, "resource");
    
    
  }

}
