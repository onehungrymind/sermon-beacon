import { TestBed } from '@angular/core/testing';

import { MediaTypesService } from './media-types.service';

describe('MediaTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaTypesService = TestBed.get(MediaTypesService);
    expect(service).toBeTruthy();
  });
});
