import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoRegistroComponent } from './cargo-registro.component';

describe('CargoRegistroComponent', () => {
  let component: CargoRegistroComponent;
  let fixture: ComponentFixture<CargoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
