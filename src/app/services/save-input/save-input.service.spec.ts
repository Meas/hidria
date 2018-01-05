import { TestBed, inject } from '@angular/core/testing';

import { SaveInputService } from './save-input.service';

describe('SaveInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveInput]
    });
  });

  it('should be created', inject([SaveInputService], (service: SaveInputService) => {
    expect(service).toBeTruthy();
  }));
});
