import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorReactivoComponent } from './selector-reactivo.component';

describe('SelectorReactivoComponent', () => {
  let component: SelectorReactivoComponent;
  let fixture: ComponentFixture<SelectorReactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorReactivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorReactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
