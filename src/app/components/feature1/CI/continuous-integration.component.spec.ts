import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousIntegrationComponent } from './continuous-integration.component';

describe('ContinuousIntegrationComponent', () => {
  let component: ContinuousIntegrationComponent;
  let fixture: ComponentFixture<ContinuousIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuousIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
