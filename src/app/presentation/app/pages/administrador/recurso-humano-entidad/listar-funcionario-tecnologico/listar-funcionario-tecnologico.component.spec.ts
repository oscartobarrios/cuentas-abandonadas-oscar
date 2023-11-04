import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFuncionarioTecnologicoComponent } from './listar-funcionario-tecnologico.component';

describe('ListarFuncionarioTecnologicoComponent', () => {
  let component: ListarFuncionarioTecnologicoComponent;
  let fixture: ComponentFixture<ListarFuncionarioTecnologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFuncionarioTecnologicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFuncionarioTecnologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
