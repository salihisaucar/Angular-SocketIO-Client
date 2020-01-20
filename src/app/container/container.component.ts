import { Observable } from "rxjs/observable";
import { Store, select } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";

import { MessageService } from "../services/message.service";
import * as fromAppReducer from "../app.reducer";
import * as fromAppActions from "../app.actions";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent implements OnInit {
  constructor(
    private service: MessageService,
    private store: Store<{ ui: fromAppReducer.State }>
  ) {}

  userId$: Observable<number>;
  userName: String = "";

  ngOnInit() {
    this.userId$ = this.store.pipe(select(data => data.ui.userId));
    this.userId$.subscribe(
      data => (
        (this.userName = this.service.getUserName(data)),
        this.store.dispatch({
          type: fromAppActions.UPDATE_CHAT_PANEL,
          payload: this.service.getChatPanelDataList(data)
        })
      )
    );
  }
}
