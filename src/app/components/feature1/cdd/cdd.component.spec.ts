import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDDComponent } from './cdd.component';

describe('CDDComponent', () => {
  let component: CDDComponent;
  let fixture: ComponentFixture<CDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
