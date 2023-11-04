import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCarguesComponent } from './estado-cargues.component';

describe('EstadoCarguesComponent', () => {
  let component: EstadoCarguesComponent;
  let fixture: ComponentFixture<EstadoCarguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoCarguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCarguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
