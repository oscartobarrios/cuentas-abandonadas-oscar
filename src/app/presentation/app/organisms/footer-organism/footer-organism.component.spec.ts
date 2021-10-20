import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOrganismComponent } from './footer-organism.component';

describe('FooterOrganismComponent', () => {
  let component: FooterOrganismComponent;
  let fixture: ComponentFixture<FooterOrganismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterOrganismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
