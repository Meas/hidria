import { TestBed, inject } from '@angular/core/testing';

import { CustomNotificationsService } from './notifications.service';

describe('CustomNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomNotificationsService]
    });
  });

  it('should be created', inject([CustomNotificationsService], (service: CustomNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
