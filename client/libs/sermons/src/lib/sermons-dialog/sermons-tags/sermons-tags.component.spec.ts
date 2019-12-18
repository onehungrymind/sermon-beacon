import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsTagsComponent } from './sermons-tags.component';

describe('SermonsTagsComponent', () => {
  let component: SermonsTagsComponent;
  let fixture: ComponentFixture<SermonsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
