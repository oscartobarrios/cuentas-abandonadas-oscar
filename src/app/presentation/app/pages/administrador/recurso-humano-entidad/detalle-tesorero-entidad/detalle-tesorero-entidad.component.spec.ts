import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTesoreroEntidadComponent } from './detalle-tesorero-entidad.component';

describe('DetalleTesoreroEntidadComponent', () => {
  let component: DetalleTesoreroEntidadComponent;
  let fixture: ComponentFixture<DetalleTesoreroEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTesoreroEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTesoreroEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
