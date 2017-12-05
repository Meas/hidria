import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionInputComponent } from './accordion-input.component';

describe('AccordionInputComponent', () => {
  let component: AccordionInputComponent;
  let fixture: ComponentFixture<AccordionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
