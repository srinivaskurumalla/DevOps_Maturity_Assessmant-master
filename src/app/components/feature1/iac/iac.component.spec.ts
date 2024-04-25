import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IACComponent } from './iac.component';

describe('IACComponent', () => {
  let component: IACComponent;
  let fixture: ComponentFixture<IACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IACComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
