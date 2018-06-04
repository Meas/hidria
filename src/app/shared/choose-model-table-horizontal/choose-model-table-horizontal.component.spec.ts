import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseModelTableHorizontalComponent } from './choose-model-table-horizontal.component';

describe('ChooseModelTableHorizontalComponent', () => {
  let component: ChooseModelTableHorizontalComponent;
  let fixture: ComponentFixture<ChooseModelTableHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseModelTableHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseModelTableHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
