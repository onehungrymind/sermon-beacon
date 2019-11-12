import { async, TestBed } from '@angular/core/testing';
import { UiModalModule } from './ui-modal.module';

describe('UiModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiModalModule).toBeDefined();
  });
});
