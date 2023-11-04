import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRevisorFiscalComponent } from './listar-revisor-fiscal.component';

describe('ListarRevisorFiscalComponent', () => {
  let component: ListarRevisorFiscalComponent;
  let fixture: ComponentFixture<ListarRevisorFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRevisorFiscalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRevisorFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
