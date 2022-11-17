import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarNotificacionComponent } from './rechazar-notificacion.component';

describe('RechazarNotificacionComponent', () => {
  let component: RechazarNotificacionComponent;
  let fixture: ComponentFixture<RechazarNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazarNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazarNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
