import { TestBed } from '@angular/core/testing';

import { WarriorsService } from './warriors.service';

describe('WarriorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarriorsService = TestBed.get(WarriorsService);
    expect(service).toBeTruthy();
  });
});
