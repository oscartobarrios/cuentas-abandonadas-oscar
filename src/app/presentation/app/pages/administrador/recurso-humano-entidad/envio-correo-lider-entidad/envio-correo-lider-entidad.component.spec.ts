import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioCorreoLiderEntidadComponent } from './envio-correo-lider-entidad.component';

describe('EnvioCorreoLiderEntidadComponent', () => {
  let component: EnvioCorreoLiderEntidadComponent;
  let fixture: ComponentFixture<EnvioCorreoLiderEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioCorreoLiderEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioCorreoLiderEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
