import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartyListComponent } from './edit-party-list.component';

describe('EditPartyListComponent', () => {
  let component: EditPartyListComponent;
  let fixture: ComponentFixture<EditPartyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
