import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnablersSurveyComponent } from './enablers-survey.component';

describe('EnablersSurveyComponent', () => {
  let component: EnablersSurveyComponent;
  let fixture: ComponentFixture<EnablersSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnablersSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnablersSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
