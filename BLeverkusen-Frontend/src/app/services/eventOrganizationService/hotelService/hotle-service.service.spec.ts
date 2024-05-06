import { TestBed } from '@angular/core/testing';

import { HotleServiceService } from './hotle-service.service';

describe('HotleServiceService', () => {
  let service: HotleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
