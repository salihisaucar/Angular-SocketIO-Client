import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";

import * as fromAppReducer from "../app.reducer";
import * as fromAppActions from "../app.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<{ ui: fromAppReducer.State }>) {}

  private _userToken: String = "";
  private _userId: number;

  setConversationToken(userToken) {
    this._userToken = userToken;
    switch (this._userToken) {
      case "salihisaucar":
        this._userId = 1;
        break;
      case "user2":
        this._userId = 2;
        break;
      case "user3":
        this._userId = 3;
        break;
    }
  }

  updateState() {
    this.store.dispatch({
      type: fromAppActions.SET_USER_ID,
      payload: this._userId
    });
    this.store.dispatch({
      type: fromAppActions.SET_CONVERSATION_TOKEN,
      payload: this._userToken
    });
  }

  ngOnInit() {}
}
