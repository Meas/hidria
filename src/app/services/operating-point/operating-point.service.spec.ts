import { TestBed, inject } from '@angular/core/testing';

import { OperatingPointService } from './operating-point.service';

describe('ChooseModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperatingPointService]
    });
  });

  it('should be created', inject([OperatingPointService], (service: OperatingPointService) => {
    expect(service).toBeTruthy();
  }));
});
