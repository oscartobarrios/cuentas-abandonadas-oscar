import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkButtonAtomComponent } from './link-button-atom.component';

describe('LinkButtonAtomComponent', () => {
  let component: LinkButtonAtomComponent;
  let fixture: ComponentFixture<LinkButtonAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkButtonAtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkButtonAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
