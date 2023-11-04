import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosCargarComponent } from './certificados-cargar.component';

describe('CertificadosCargarComponent', () => {
  let component: CertificadosCargarComponent;
  let fixture: ComponentFixture<CertificadosCargarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadosCargarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadosCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
