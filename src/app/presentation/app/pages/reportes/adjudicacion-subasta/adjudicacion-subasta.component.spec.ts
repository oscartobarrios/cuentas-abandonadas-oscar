import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjudicacionSubastaComponent } from './adjudicacion-subasta.component';

describe('AdjudicacionSubastaComponent', () => {
  let component: AdjudicacionSubastaComponent;
  let fixture: ComponentFixture<AdjudicacionSubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjudicacionSubastaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjudicacionSubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
