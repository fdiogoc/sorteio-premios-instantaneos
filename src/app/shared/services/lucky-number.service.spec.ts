import { TestBed } from '@angular/core/testing';

import { LuckyNumberService } from './lucky-number.service';

describe('LuckyNumberService', () => {
  let service: LuckyNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuckyNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
