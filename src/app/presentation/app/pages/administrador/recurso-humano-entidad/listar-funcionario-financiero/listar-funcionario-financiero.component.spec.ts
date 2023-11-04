import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFuncionarioFinancieroComponent } from './listar-funcionario-financiero.component';

describe('ListarFuncionarioFinancieroComponent', () => {
  let component: ListarFuncionarioFinancieroComponent;
  let fixture: ComponentFixture<ListarFuncionarioFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFuncionarioFinancieroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFuncionarioFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
