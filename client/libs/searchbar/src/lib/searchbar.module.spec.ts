import { async, TestBed } from '@angular/core/testing';
import { SearchbarModule } from './searchbar.module';

describe('SearchbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchbarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SearchbarModule).toBeDefined();
  });
});
