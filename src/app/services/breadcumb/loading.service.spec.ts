import { TestBed } from '@angular/core/testing';

import { BreadCumbService } from './breadcumb.service';

describe('LoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreadCumbService = TestBed.get(BreadCumbService);
    expect(service).toBeTruthy();
  });
});
