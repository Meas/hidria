import { TestBed, inject } from '@angular/core/testing';

import { FanInfoService } from './fan-info.service';

describe('FanInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FanInfoService]
    });
  });

  it('should be created', inject([FanInfoService], (service: FanInfoService) => {
    expect(service).toBeTruthy();
  }));
});
