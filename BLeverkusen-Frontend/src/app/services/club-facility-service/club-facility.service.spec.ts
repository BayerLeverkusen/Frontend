import { TestBed } from '@angular/core/testing';

import { ClubFacilityService } from './club-facility.service';

describe('ClubFacilityService', () => {
  let service: ClubFacilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubFacilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
