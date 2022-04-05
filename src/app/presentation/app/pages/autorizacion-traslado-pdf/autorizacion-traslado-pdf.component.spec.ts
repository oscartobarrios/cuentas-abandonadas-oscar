import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionTrasladoPdfComponent } from './autorizacion-traslado-pdf.component';

describe('AutorizacionTrasladoPdfComponent', () => {
  let component: AutorizacionTrasladoPdfComponent;
  let fixture: ComponentFixture<AutorizacionTrasladoPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionTrasladoPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionTrasladoPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
