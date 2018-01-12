import { TestBed, inject } from '@angular/core/testing';

import { ErrorMessagesService } from './error-messages.service';

describe('ErrorMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorMessagesService]
    });
  });

  it('should be created', inject([ErrorMessagesService], (service: ErrorMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
