import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnablersSurveyComponent } from './enablers-survey/enablers-survey.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {path:'challenges',component:SurveyComponent},
  {path:'enablers',component:EnablersSurveyComponent},
  {path:'dashboard',component:DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Feature2RoutingModule { }
