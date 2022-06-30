import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarguesRechazadosComponent } from './cargues-rechazados.component';

describe('CarguesRechazadosComponent', () => {
  let component: CarguesRechazadosComponent;
  let fixture: ComponentFixture<CarguesRechazadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarguesRechazadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarguesRechazadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
