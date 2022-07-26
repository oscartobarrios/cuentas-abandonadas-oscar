import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosReintegroTesoreroComponent } from './datos-reintegro-tesorero.component';

describe('DatosReintegroTesoreroComponent', () => {
  let component: DatosReintegroTesoreroComponent;
  let fixture: ComponentFixture<DatosReintegroTesoreroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosReintegroTesoreroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosReintegroTesoreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
