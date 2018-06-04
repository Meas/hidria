import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseModelTableComponent } from './choose-model-table.component';

describe('ChooseModelTableComponent', () => {
  let component: ChooseModelTableComponent;
  let fixture: ComponentFixture<ChooseModelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseModelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseModelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
