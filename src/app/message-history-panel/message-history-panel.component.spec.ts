import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryPanelComponent } from './message-history-panel.component';

describe('MessageHistoryPanelComponent', () => {
  let component: MessageHistoryPanelComponent;
  let fixture: ComponentFixture<MessageHistoryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageHistoryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHistoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
