import { async, TestBed } from '@angular/core/testing';
import { UiSidenavModule } from './ui-sidenav.module';

describe('UiSidenavModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiSidenavModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiSidenavModule).toBeDefined();
  });
});
