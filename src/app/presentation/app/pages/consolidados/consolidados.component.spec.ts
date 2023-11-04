import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadosComponent } from './consolidados.component';

describe('ConsolidadosComponent', () => {
  let component: ConsolidadosComponent;
  let fixture: ComponentFixture<ConsolidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
