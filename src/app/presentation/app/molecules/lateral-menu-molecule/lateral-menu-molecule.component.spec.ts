import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralMenuMoleculeComponent } from './lateral-menu-molecule.component';

describe('LateralMenuMoleculeComponent', () => {
  let component: LateralMenuMoleculeComponent;
  let fixture: ComponentFixture<LateralMenuMoleculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateralMenuMoleculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LateralMenuMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
