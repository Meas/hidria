import { TestBed, inject } from '@angular/core/testing';

import { MyProjectsService } from './my-projects.service';

describe('MyProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyProjectsService]
    });
  });

  it('should be created', inject([MyProjectsService], (service: MyProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
