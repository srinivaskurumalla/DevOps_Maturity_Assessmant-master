import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Feature2RoutingModule } from './feature2-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { FormsModule } from '@angular/forms';
import { EnablersSurveyComponent } from './enablers-survey/enablers-survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SurveyComponent,
    EnablersSurveyComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Feature2RoutingModule,
    MatTooltipModule
  ]
})
export class Feature2Module { }
