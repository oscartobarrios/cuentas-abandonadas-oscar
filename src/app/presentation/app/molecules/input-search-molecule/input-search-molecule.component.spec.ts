import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputAtomComponent } from './../../atoms/input-atom/input-atom.component';
import { InputSearchMoleculeComponent } from './input-search-molecule.component';

describe('InputSearchMoleculeComponent', () => {
  let component: InputSearchMoleculeComponent;
  let fixture: ComponentFixture<InputSearchMoleculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ InputAtomComponent, InputSearchMoleculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
