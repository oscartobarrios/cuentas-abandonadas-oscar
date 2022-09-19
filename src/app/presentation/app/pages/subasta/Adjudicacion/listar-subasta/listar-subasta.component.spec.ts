import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSubastaComponent } from './listar-subasta.component';

describe('ListarSubastaComponent', () => {
  let component: ListarSubastaComponent;
  let fixture: ComponentFixture<ListarSubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSubastaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
