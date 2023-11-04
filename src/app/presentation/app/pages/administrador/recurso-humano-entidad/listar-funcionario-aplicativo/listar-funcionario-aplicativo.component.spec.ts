import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFuncionarioAplicativoComponent } from './listar-funcionario-aplicativo.component';

describe('ListarFuncionarioAplicativoComponent', () => {
  let component: ListarFuncionarioAplicativoComponent;
  let fixture: ComponentFixture<ListarFuncionarioAplicativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFuncionarioAplicativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFuncionarioAplicativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
