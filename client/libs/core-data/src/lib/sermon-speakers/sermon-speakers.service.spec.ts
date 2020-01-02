import { TestBed } from '@angular/core/testing';

import { SermonSpeakersService } from './sermon-speakers.service';

describe('SermonSpeakersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SermonSpeakersService = TestBed.get(SermonSpeakersService);
    expect(service).toBeTruthy();
  });
});
