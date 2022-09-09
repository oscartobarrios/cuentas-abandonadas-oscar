import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdjudicacionComponent } from './listar-adjudicacion.component';

describe('ListarAdjudicacionComponent', () => {
  let component: ListarAdjudicacionComponent;
  let fixture: ComponentFixture<ListarAdjudicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAdjudicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAdjudicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
