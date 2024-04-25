import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  devOpsSurveyForm: FormGroup
  devOpsAssessmentForm: FormGroup
  constructor(private dbService: DbService, private fb: FormBuilder, private router: Router) {
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

  goToAssessment() {
    this.dbService.isSidebarOpen = true;
  }
  goToSurvey() {
    this.dbService.isSidebarOpen = true;
  }

  saveSurvey() {
    console.log('devops survey form', this.devOpsSurveyForm.value);
  }
  saveAssessment() {
    console.log('devops Assessment form', this.devOpsAssessmentForm.value);
    this.dbService.projectData = this.devOpsAssessmentForm.value
    if (this.devOpsAssessmentForm.valid) {
      sessionStorage.setItem('devOpsForm', JSON.stringify(this.devOpsAssessmentForm.value));
      this.router.navigate(['/feature1/config']);
      this.dbService.isSidebarOpen = true;
    }
  }
}
