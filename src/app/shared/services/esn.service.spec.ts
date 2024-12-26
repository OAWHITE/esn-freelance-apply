import { TestBed } from '@angular/core/testing';

import { EsnService } from './esn.service';

describe('EsnService', () => {
  let service: EsnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
