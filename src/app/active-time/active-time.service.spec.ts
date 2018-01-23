import { TestBed, inject } from '@angular/core/testing';

import { ActiveTimeService } from './active-time.service';

describe('ActiveTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveTimeService]
    });
  });

  it('should be created', inject([ActiveTimeService], (service: ActiveTimeService) => {
    expect(service).toBeTruthy();
  }));
});
