import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarActualizarFuncionarioEntidadComponent } from './registrar-actualizar-funcionario-entidad.component';

describe('RegistrarActualizarFuncionarioEntidadComponent', () => {
  let component: RegistrarActualizarFuncionarioEntidadComponent;
  let fixture: ComponentFixture<RegistrarActualizarFuncionarioEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarActualizarFuncionarioEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarActualizarFuncionarioEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
