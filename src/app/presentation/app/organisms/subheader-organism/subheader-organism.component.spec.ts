import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from './../../../shared/modules/material.module';
import { SubheaderOrganismComponent } from './subheader-organism.component';

describe('SubheaderOrganismComponent', () => {
  let component: SubheaderOrganismComponent;
  let fixture: ComponentFixture<SubheaderOrganismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubheaderOrganismComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubheaderOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
