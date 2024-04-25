import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMComponent } from './cm.component';

describe('CMComponent', () => {
  let component: CMComponent;
  let fixture: ComponentFixture<CMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
