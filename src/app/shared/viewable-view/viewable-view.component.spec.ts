import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewableViewComponent } from './viewable-view.component';

describe('ViewableViewComponent', () => {
  let component: ViewableViewComponent;
  let fixture: ComponentFixture<ViewableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewableViewComponent]
    });
    fixture = TestBed.createComponent(ViewableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
