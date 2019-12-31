import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonViewComponent } from './sermon-view.component';

describe('SermonViewComponent', () => {
  let component: SermonViewComponent;
  let fixture: ComponentFixture<SermonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
