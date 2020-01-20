import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxPeopleComponent } from './inbox-people.component';

describe('InboxPeopleComponent', () => {
  let component: InboxPeopleComponent;
  let fixture: ComponentFixture<InboxPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
