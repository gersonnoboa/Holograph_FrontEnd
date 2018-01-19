import { TestBed, inject } from '@angular/core/testing';

import { MiningServiceService } from './mining-service.service';

describe('MiningServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiningServiceService]
    });
  });

  it('should be created', inject([MiningServiceService], (service: MiningServiceService) => {
    expect(service).toBeTruthy();
  }));
});
