import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMyProjectsComponent } from './search-my-projects.component';

describe('SearchMyProjectsComponent', () => {
  let component: SearchMyProjectsComponent;
  let fixture: ComponentFixture<SearchMyProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMyProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
