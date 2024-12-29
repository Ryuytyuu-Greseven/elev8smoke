import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCigarComponent } from './view-cigar.component';

describe('ViewCigarComponent', () => {
  let component: ViewCigarComponent;
  let fixture: ComponentFixture<ViewCigarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCigarComponent]
    });
    fixture = TestBed.createComponent(ViewCigarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
