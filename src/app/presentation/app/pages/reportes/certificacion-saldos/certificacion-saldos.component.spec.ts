import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificacionSaldosComponent } from './certificacion-saldos.component';

describe('CertificacionSaldosComponent', () => {
  let component: CertificacionSaldosComponent;
  let fixture: ComponentFixture<CertificacionSaldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificacionSaldosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificacionSaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
