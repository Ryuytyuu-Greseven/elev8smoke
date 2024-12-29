import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCigarsComponent } from './view-cigars.component';

describe('ViewCigarsComponent', () => {
  let component: ViewCigarsComponent;
  let fixture: ComponentFixture<ViewCigarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCigarsComponent]
    });
    fixture = TestBed.createComponent(ViewCigarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
