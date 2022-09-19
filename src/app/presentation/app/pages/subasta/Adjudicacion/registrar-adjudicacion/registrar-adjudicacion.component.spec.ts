import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAdjudicacionComponent } from './registrar-adjudicacion.component';

describe('RegistrarAdjudicacionComponent', () => {
  let component: RegistrarAdjudicacionComponent;
  let fixture: ComponentFixture<RegistrarAdjudicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAdjudicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAdjudicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
