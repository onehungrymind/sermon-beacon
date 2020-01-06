import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarActionsComponent } from './searchbar-actions.component';

describe('SearchbarActionsComponent', () => {
  let component: SearchbarActionsComponent;
  let fixture: ComponentFixture<SearchbarActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbarActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
