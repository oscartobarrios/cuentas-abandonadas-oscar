import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSebraComponent } from './datos-sebra.component';

describe('DatosSebraComponent', () => {
  let component: DatosSebraComponent;
  let fixture: ComponentFixture<DatosSebraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosSebraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosSebraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
