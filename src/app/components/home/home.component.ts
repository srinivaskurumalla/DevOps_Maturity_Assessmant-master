import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('surveyFormDialog') surveyFormDialogTemplate!: TemplateRef<any>;
  surveyDialogRef!: MatDialogRef<any>;
  @ViewChild('devOpsAssessmentDialog') devOpsDialogTemplate!: TemplateRef<any>;
  devOpsDialogRef!: MatDialogRef<any>;

  devOpsSurveyForm: FormGroup
  devOpsAssessmentForm: FormGroup
  constructor(private dbService: DbService, public dialog: MatDialog, private fb: FormBuilder, private router: Router) {
    this.dbService.isSidebarOpen = false

    this.devOpsSurveyForm = this.fb.group({
      buName: [null, Validators.required],
      projectName: [null, Validators.required]
    })
    this.devOpsAssessmentForm = this.fb.group({
      buName: [null, Validators.required],
      projectName: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.dbService.isSidebarOpen = false
  }


  openSurveyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.surveyDialogRef = this.dialog.open(this.surveyFormDialogTemplate, {
      width: '500px',
      data: {
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    this.surveyDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Handle any actions after the dialog is closed, if needed
    });
  }
  openDevOpsDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.devOpsDialogRef = this.dialog.open(this.devOpsDialogTemplate, {
      width: '500px',
      data: {
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    this.devOpsDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  saveSurvey() {
    console.log('devops survey form', this.devOpsSurveyForm.value);
    this.dbService.projectData = this.devOpsSurveyForm.value
    if (this.devOpsSurveyForm.valid) {
      sessionStorage.setItem('devOpsForm', JSON.stringify(this.devOpsSurveyForm.value));
      this.router.navigate(['/feature2/challenges']);
      this.dbService.isSidebarOpen = true;
      this.closeSurveyDialog()

    }
  }
  saveAssessment() {
    console.log('devops Assessment form', this.devOpsAssessmentForm.value);
    this.dbService.projectData = this.devOpsAssessmentForm.value
    if (this.devOpsAssessmentForm.valid) {
      sessionStorage.setItem('devOpsForm', JSON.stringify(this.devOpsAssessmentForm.value));
      this.router.navigate(['/feature1/config']);
      this.dbService.isSidebarOpen = true;
      this.closeDevOpsDialog()

    }
  }

  closeSurveyDialog() {
    this.surveyDialogRef.close()
  }
  closeDevOpsDialog() {
    this.devOpsDialogRef.close()
  }
}
