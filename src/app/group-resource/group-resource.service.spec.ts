import { TestBed, inject } from '@angular/core/testing';

import { GroupResourceService } from './group-resource.service';

describe('GroupResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupResourceService]
    });
  });

  it('should be created', inject([GroupResourceService], (service: GroupResourceService) => {
    expect(service).toBeTruthy();
  }));
});
