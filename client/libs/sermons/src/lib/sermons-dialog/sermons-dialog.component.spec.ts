import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsDialogComponent } from './sermons-dialog.component';

describe('SermonsDialogComponent', () => {
  let component: SermonsDialogComponent;
  let fixture: ComponentFixture<SermonsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
