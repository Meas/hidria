import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingPointsInputsComponent } from './operating-points-inputs.component';

describe('FormBoxComponent', () => {
  let component: OperatingPointsInputsComponent;
  let fixture: ComponentFixture<OperatingPointsInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingPointsInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingPointsInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
