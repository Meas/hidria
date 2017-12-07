import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanInfoComponent } from './fan-info.component';

describe('FanInfoComponent', () => {
  let component: FanInfoComponent;
  let fixture: ComponentFixture<FanInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
