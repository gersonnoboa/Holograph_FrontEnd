import { Component, OnInit, Input } from '@angular/core';
import { ActiveTimeService } from './active-time.service';
import { AlertState, AlertType } from '../general/alert-state';
import { Utils } from '../general/utils';

@Component({
  selector: 'app-active-time',
  templateUrl: './active-time.component.html',
  styleUrls: ['./active-time.component.css']
})
export class ActiveTimeComponent implements OnInit {

  isLoading: boolean;
  isShowingActiveTime: boolean;
  alertState: AlertState = new AlertState();

  view: any[] = [700, 400];

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ];

  constructor(private activeTimeService: ActiveTimeService) { 
  }

  ngOnInit() {    
  }

  changeComponentState(state: ComponentState) {
    this.isLoading = false;
    this.isShowingActiveTime = false;

    switch (state) {
      case ComponentState.Loading:
        this.isLoading = true;
        break;
      case ComponentState.ShowingActiveTime:
        this.isShowingActiveTime = true;
        break;
    
      case ComponentState.None:
      default:
        break;
    }
  }
  
  showAlert(){
    this.alertState.showAlert(AlertType.Danger, "An error has occurred. Please try again later.");
  }

}

enum ComponentState {
  None,
  Loading,
  AskingForFields,
  ShowingActiveTime
}