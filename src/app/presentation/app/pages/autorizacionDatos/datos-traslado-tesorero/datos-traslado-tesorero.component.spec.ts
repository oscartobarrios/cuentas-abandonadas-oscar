import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTrasladoTesoreroComponent } from './datos-traslado-tesorero.component';

describe('DatosTrasladoTesoreroComponent', () => {
  let component: DatosTrasladoTesoreroComponent;
  let fixture: ComponentFixture<DatosTrasladoTesoreroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosTrasladoTesoreroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTrasladoTesoreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
