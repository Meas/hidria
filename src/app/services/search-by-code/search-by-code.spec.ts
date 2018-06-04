import { TestBed, inject } from '@angular/core/testing';

import { SearchByCodeService } from './search-by-code.service';

describe('ChooseModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchByCodeService]
    });
  });

  it('should be created', inject([SearchByCodeService], (service: SearchByCodeService) => {
    expect(service).toBeTruthy();
  }));
});
