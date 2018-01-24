import { TestBed, inject } from '@angular/core/testing';

import { ComparisonService } from './comparison.service';

describe('ChooseModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComparisonService]
    });
  });

  it('should be created', inject([ComparisonService], (service: ComparisonService) => {
    expect(service).toBeTruthy();
  }));
});
