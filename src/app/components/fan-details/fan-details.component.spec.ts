import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanDetailsComponent } from './fan-details.component';

describe('FanDetailsComponent', () => {
  let component: FanDetailsComponent;
  let fixture: ComponentFixture<FanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
