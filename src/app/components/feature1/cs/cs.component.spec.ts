import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSComponent } from './cs.component';

describe('CSComponent', () => {
  let component: CSComponent;
  let fixture: ComponentFixture<CSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
