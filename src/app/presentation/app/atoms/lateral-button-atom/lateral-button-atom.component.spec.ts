import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralButtonAtomComponent } from './lateral-button-atom.component';

describe('LateralButtonAtomComponent', () => {
  let component: LateralButtonAtomComponent;
  let fixture: ComponentFixture<LateralButtonAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateralButtonAtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateralButtonAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
