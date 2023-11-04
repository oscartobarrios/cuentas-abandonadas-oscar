import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAtomComponent } from './select-atom.component';

describe('SelectAtomComponent', () => {
  let component: SelectAtomComponent;
  let fixture: ComponentFixture<SelectAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
