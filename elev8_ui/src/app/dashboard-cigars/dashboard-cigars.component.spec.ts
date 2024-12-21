import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCigarsComponent } from './dashboard-cigars.component';

describe('DashboardCigarsComponent', () => {
  let component: DashboardCigarsComponent;
  let fixture: ComponentFixture<DashboardCigarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCigarsComponent]
    });
    fixture = TestBed.createComponent(DashboardCigarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
