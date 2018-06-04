import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPerformanceCurveComponent } from './chart-performance-curve.component';

describe('ChartPerformanceCurveComponent', () => {
  let component: ChartPerformanceCurveComponent;
  let fixture: ComponentFixture<ChartPerformanceCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPerformanceCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPerformanceCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
