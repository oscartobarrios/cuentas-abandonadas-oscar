import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRepresentanteLegalComponent } from './listar-representante-legal.component';

describe('ListarRepresentanteLegalComponent', () => {
  let component: ListarRepresentanteLegalComponent;
  let fixture: ComponentFixture<ListarRepresentanteLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRepresentanteLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
