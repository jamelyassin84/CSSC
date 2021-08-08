import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLoadersComponent } from './button-loaders.component';

describe('ButtonLoadersComponent', () => {
  let component: ButtonLoadersComponent;
  let fixture: ComponentFixture<ButtonLoadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLoadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
