import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionReintegroPdfComponent } from './autorizacion-reintegro-pdf.component';

describe('AutorizacionReintegroPdfComponent', () => {
  let component: AutorizacionReintegroPdfComponent;
  let fixture: ComponentFixture<AutorizacionReintegroPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionReintegroPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionReintegroPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
