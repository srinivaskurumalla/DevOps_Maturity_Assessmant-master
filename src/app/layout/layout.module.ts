import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from '../components/feature1/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationManagementComponent } from '../components/feature1/configuration-management/configuration-management.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'header', component: HeaderComponent},
      { path: 'feature1/config', component: ConfigurationManagementComponent},
    ]),
  ],
  exports : [
    HeaderComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
