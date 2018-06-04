import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsModelListComponent } from './my-projects-model-list.component';

describe('MyProjectsModelListComponent', () => {
  let component: MyProjectsModelListComponent;
  let fixture: ComponentFixture<MyProjectsModelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectsModelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
