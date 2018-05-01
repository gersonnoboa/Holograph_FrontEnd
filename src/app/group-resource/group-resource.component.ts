import { Component, OnInit, KeyValueDiffers, DoCheck, Input } from '@angular/core';
import { GroupService } from '../group/group.service';

@Component({
  selector: 'app-group-resource',
  templateUrl: './group-resource.component.html',
  styleUrls: ['./group-resource.component.css']
})
export class GroupResourceComponent implements OnInit, DoCheck {

  @Input("parameters") parameters: any;
  @Input("isCurrentActiveTab") isCurrentActiveTab = false;
  show = false;

  data: any;
  differ: any;
  isLoading = true;

  constructor(private groupService: GroupService, private differs: KeyValueDiffers) { }

  ngOnInit() {
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.parameters);
    if (changes) {
      //this.requestGroupInformation();
    }
  }

  ngOnChanges(changes: any) {
    if (changes.isCurrentActiveTab.currentValue == true && this.isLoading == false) {
      this.show = true;
    }
  }

}
