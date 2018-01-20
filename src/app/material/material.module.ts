import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
