import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionRechazoComponent } from './autorizacion-rechazo.component';

describe('AutorizacionRechazoComponent', () => {
  let component: AutorizacionRechazoComponent;
  let fixture: ComponentFixture<AutorizacionRechazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionRechazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
