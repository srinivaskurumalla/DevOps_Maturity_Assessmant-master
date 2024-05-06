import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnablersSurveyComponent } from './enablers-survey/enablers-survey.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {path:'challenges',component:SurveyComponent},
  {path:'enablers',component:EnablersSurveyComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Feature2RoutingModule { }
