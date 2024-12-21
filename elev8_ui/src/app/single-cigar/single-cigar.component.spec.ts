import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCigarComponent } from './single-cigar.component';

describe('SingleCigarComponent', () => {
  let component: SingleCigarComponent;
  let fixture: ComponentFixture<SingleCigarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCigarComponent]
    });
    fixture = TestBed.createComponent(SingleCigarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
