import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuOrganismComponent } from './sub-menu-organism.component';

describe('SubMenuOrganismComponent', () => {
  let component: SubMenuOrganismComponent;
  let fixture: ComponentFixture<SubMenuOrganismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubMenuOrganismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
