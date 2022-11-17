import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCorreoComponent } from './listar-correo.component';

describe('ListarCorreoComponent', () => {
  let component: ListarCorreoComponent;
  let fixture: ComponentFixture<ListarCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
