import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalladosComponent } from './detallados.component';

describe('DetalladosComponent', () => {
  let component: DetalladosComponent;
  let fixture: ComponentFixture<DetalladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalladosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
