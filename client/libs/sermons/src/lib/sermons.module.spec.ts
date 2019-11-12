import { async, TestBed } from '@angular/core/testing';
import { SermonsModule } from './sermons.module';

describe('SermonsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SermonsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SermonsModule).toBeDefined();
  });
});
