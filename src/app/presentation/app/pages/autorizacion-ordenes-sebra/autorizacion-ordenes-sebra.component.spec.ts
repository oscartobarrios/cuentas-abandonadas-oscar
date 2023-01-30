import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionOrdenesSebraComponent } from './autorizacion-ordenes-sebra.component';

describe('AutorizacionOrdenesSebraComponent', () => {
  let component: AutorizacionOrdenesSebraComponent;
  let fixture: ComponentFixture<AutorizacionOrdenesSebraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionOrdenesSebraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionOrdenesSebraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
