import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularValorComponent } from './calcular-valor.component';

describe('CalcularValorComponent', () => {
  let component: CalcularValorComponent;
  let fixture: ComponentFixture<CalcularValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcularValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
