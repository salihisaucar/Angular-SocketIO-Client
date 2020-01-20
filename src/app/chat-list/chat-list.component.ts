import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/observable";
import { Store, select } from "@ngrx/store";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import * as fromAppReducer from "../app.reducer";
import * as fromActions from "src/app/app.actions";

@Component({
  selector: "app-chat-list",
  templateUrl: "./chat-list.component.html",
  styleUrls: ["./chat-list.component.css"]
})
export class ChatListComponent implements OnInit {
  constructor(private store: Store<{ ui: fromAppReducer.State }>) {}

  chatPanel$: Observable<Array<any>>;

  changeMessageHistoryToken(token) {
    this.store.dispatch({
      type: fromActions.CHANGE_MESSAGE_HISTORY_TOKEN,
      payload: token
    });
    this.store.dispatch({
      type: fromActions.CHANGE_NEW_MESSAGE_CLASS,
      payload: token
    });
  }

  ngOnInit() {
    this.chatPanel$ = this.store.pipe(select(data => data.ui.chatPanel));
  }
}
