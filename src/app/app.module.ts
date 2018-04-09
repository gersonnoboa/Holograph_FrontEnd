import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FileUploadService } from './file-upload/file-upload.service';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActiveTimeComponent } from './active-time/active-time.component';
import { TracesComponent } from './traces/traces.component';
import { MaterialModule } from './material/material.module';
import { MiningService } from './mining/mining.service';
import { ActiveTimeService } from './active-time/active-time.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService } from './dashboard/dashboard.service';
import { TracesService } from './traces/traces.service';
import { FlowsComponent } from './flows/flows.component';
import { FlowsService } from './flows/flows.service';
import { IndividualComponent } from './individual/individual.component';
import { IndividualService } from './individual/individual.service';
import { GroupComponent } from './group/group.component';

const appRoutes: Routes = [
  { path: 'dashboard/:id', component: DashboardComponent },
  
  { path: 'home', component: FileUploadComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    NavbarComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ActiveTimeComponent,
    TracesComponent,
    FlowsComponent,
    IndividualComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    FileUploadService,
    MiningService,
    ActiveTimeService,
    DashboardService,
    TracesService,
    FlowsService,
    IndividualService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

class RoutesDemoAppModule {}