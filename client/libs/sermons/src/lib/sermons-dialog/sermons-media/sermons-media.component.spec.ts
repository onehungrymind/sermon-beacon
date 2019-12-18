import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsMediaComponent } from './sermons-media.component';

describe('SermonsMediaComponent', () => {
  let component: SermonsMediaComponent;
  let fixture: ComponentFixture<SermonsMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
