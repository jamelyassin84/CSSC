import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartylistsComponent } from './partylists.component';

describe('PartylistsComponent', () => {
  let component: PartylistsComponent;
  let fixture: ComponentFixture<PartylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
