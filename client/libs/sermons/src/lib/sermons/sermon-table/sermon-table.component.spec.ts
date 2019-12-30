import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonTableComponent } from './sermon-table.component';

describe('SermonTableComponent', () => {
  let component: SermonTableComponent;
  let fixture: ComponentFixture<SermonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
