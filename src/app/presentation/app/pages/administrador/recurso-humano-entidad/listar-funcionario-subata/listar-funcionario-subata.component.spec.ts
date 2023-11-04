import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFuncionarioSubataComponent } from './listar-funcionario-subata.component';

describe('ListarFuncionarioSubataComponent', () => {
  let component: ListarFuncionarioSubataComponent;
  let fixture: ComponentFixture<ListarFuncionarioSubataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFuncionarioSubataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFuncionarioSubataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
