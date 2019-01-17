import { TestBed } from '@angular/core/testing';

import { SsrApiService } from './ssr-api.service';

describe('SsrApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SsrApiService = TestBed.get(SsrApiService);
    expect(service).toBeTruthy();
  });
});
