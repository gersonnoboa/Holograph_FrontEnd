import { TestBed, inject } from '@angular/core/testing';

import { MiningService } from './mining.service';

describe('MiningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiningService]
    });
  });

  it('should be created', inject([MiningService], (service: MiningService) => {
    expect(service).toBeTruthy();
  }));
});
