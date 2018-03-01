import { Component, OnInit, Input, KeyValueDiffers } from '@angular/core';
import { FlowsService } from './flows.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css']
})
export class FlowsComponent implements OnInit {

  @Input("parameters") parameters: any;
  differ: any;
  data: any;

  constructor(private flowsService: FlowsService, private differs: KeyValueDiffers) { 

  }

  ngOnInit() {
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.parameters);
    if (changes) {
      this.requestFlowsInformation();
    }
  }

  requestFlowsInformation() {
    console.log("flow information");

    this.flowsService.requestFlowInformation(this.parameters).subscribe(event => {
      this.data = event;
      this.getFlowsInformation();
    }, error => {
      
      if (error instanceof HttpErrorResponse) {
        console.log(error.message);
      }
    });
  }

  getFlowsInformation() {
    this.data = this.data as Array<any>;
    console.log(this.data);
  }

}
