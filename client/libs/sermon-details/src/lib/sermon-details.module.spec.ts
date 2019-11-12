import { async, TestBed } from '@angular/core/testing';
import { SermonDetailsModule } from './sermon-details.module';

describe('SermonDetailsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SermonDetailsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SermonDetailsModule).toBeDefined();
  });
});
