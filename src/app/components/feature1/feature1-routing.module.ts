import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CATComponent } from './cat/cat.component';
import { CDDComponent } from './cdd/cdd.component';
import { ContinuousIntegrationComponent } from './CI/continuous-integration.component';
import { CMComponent } from './cm/cm.component';
import { ConfigurationManagementComponent } from './configuration-management/configuration-management.component';
import { CSComponent } from './cs/cs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IACComponent } from './iac/iac.component';
import { PdfDownloadComponent } from './pdf-download/pdf-download.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {path:'/home',component:HomeComponent,pathMatch:'full'},
  {path:'config',component:ConfigurationManagementComponent},
  {path:'ci',component:ContinuousIntegrationComponent},
  {path:'cat',component:CATComponent},
  {path:'iac',component:IACComponent},
  {path:'cdd',component:CDDComponent},
  {path:'cm',component:CMComponent},
  {path:'cs',component:CSComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'pdf-download',component:PdfDownloadComponent},
  {path:'review',component:ReviewComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Feature1RoutingModule { }
