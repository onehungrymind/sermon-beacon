import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsDetailsComponent } from './sermons-details.component';

describe('SermonsDetailsComponent', () => {
  let component: SermonsDetailsComponent;
  let fixture: ComponentFixture<SermonsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
