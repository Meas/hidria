import { TestBed, inject } from '@angular/core/testing';

import { ChooseModelService } from './chooseModel.service';

describe('ChooseModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChooseModelService]
    });
  });

  it('should be created', inject([ChooseModelService], (service: ChooseModelService) => {
    expect(service).toBeTruthy();
  }));
});
