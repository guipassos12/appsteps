import { TestBed } from '@angular/core/testing';

import { LuzService } from './luz.service';

describe('LuzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LuzService = TestBed.get(LuzService);
    expect(service).toBeTruthy();
  });
});
