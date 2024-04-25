import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { Feature1RoutingModule } from './feature1-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PdfDownloadComponent } from './pdf-download/pdf-download.component';
import { ConfigurationManagementComponent } from './configuration-management/configuration-management.component';
import { ContinuousIntegrationComponent } from './CI/continuous-integration.component';
import { CMComponent } from './cm/cm.component';
import { CDDComponent } from './cdd/cdd.component';
import { CATComponent } from './cat/cat.component';
import { IACComponent } from './iac/iac.component';
import { CSComponent } from './cs/cs.component';
import { TableComponent } from '../table/table.component';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PdfDownloadComponent,
    ConfigurationManagementComponent,
    ContinuousIntegrationComponent,
    CATComponent,
    CDDComponent,
    IACComponent,
    CMComponent,
    ConfigurationManagementComponent,
    IACComponent,
    CSComponent,
    TableComponent,
    ReviewComponent,
    //IACComponent,
    //CDDComponent,
   // CMComponent,

  ],
  imports: [
    CommonModule,
    Feature1RoutingModule,
   FormsModule,
   ReactiveFormsModule,
   MatTooltipModule,
   ToastModule,
   TableModule
  ]
})
export class Feature1Module { 
  constructor(){}
}
