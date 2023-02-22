import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosActualizacionReintegroTesoreroComponent } from './datos-actualizacion-reintegro-tesorero.component';

describe('DatosActualizacionReintegroTesoreroComponent', () => {
  let component: DatosActualizacionReintegroTesoreroComponent;
  let fixture: ComponentFixture<DatosActualizacionReintegroTesoreroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosActualizacionReintegroTesoreroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosActualizacionReintegroTesoreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
