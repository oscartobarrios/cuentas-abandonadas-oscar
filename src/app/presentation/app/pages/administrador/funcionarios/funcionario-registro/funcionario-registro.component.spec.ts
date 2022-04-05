import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioRegistroComponent } from './funcionario-registro.component';

describe('FuncionarioRegistroComponent', () => {
  let component: FuncionarioRegistroComponent;
  let fixture: ComponentFixture<FuncionarioRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionarioRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
