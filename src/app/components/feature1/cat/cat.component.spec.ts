import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CATComponent } from './cat.component';

describe('CATComponent', () => {
  let component: CATComponent;
  let fixture: ComponentFixture<CATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CATComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
