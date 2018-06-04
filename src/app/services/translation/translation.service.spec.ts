import { TestBed, inject } from '@angular/core/testing';

import { MyTranslationService } from './translation.service';

describe('MyTranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTranslationService]
    });
  });

  it('should be created', inject([MyTranslationService], (service: MyTranslationService) => {
    expect(service).toBeTruthy();
  }));
});
