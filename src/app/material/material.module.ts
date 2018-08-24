import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule, 
    MatButtonToggleModule
  ],
  exports: [
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatButtonToggleModule
  ],
  declarations: []
})
export class MaterialModule { }
