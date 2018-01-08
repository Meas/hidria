import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsTitleComponent } from './my-projects-title.component';

describe('MyProjectsTitleComponent', () => {
  let component: MyProjectsTitleComponent;
  let fixture: ComponentFixture<MyProjectsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
