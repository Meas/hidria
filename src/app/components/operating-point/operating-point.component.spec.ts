import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingPointComponent } from './operating-point.component';

describe('ChooseModelComponent', () => {
  let component: OperatingPointComponent;
  let fixture: ComponentFixture<OperatingPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
