import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOrganismComponent } from './header-organism.component';

describe('HeaderOrganismComponent', () => {
  let component: HeaderOrganismComponent;
  let fixture: ComponentFixture<HeaderOrganismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOrganismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
