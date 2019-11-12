import { async, TestBed } from '@angular/core/testing';
import { SermonListModule } from './sermon-list.module';

describe('SermonListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SermonListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SermonListModule).toBeDefined();
  });
});
