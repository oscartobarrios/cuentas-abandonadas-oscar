import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoEntidadComponent } from './consolidado-entidad.component';

describe('ConsolidadoEntidadComponent', () => {
  let component: ConsolidadoEntidadComponent;
  let fixture: ComponentFixture<ConsolidadoEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidadoEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
