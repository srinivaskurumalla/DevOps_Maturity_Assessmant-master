import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Feature2RoutingModule } from './feature2-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Feature2RoutingModule
  ]
})
export class Feature2Module { }
