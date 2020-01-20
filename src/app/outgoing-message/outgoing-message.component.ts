import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs/observable";
import { Store, select } from "@ngrx/store";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import * as fromAppReducer from "../app.reducer";

@Component({
  selector: "app-outgoing-message",
  templateUrl: "./outgoing-message.component.html",
  styleUrls: ["./outgoing-message.component.css"]
})
export class OutgoingMessageComponent implements OnInit {
  constructor(private store: Store<{ ui: fromAppReducer.State }>) {}

  outgoingMessage$: Observable<String>;

  @Input() message: String;

  ngOnInit() {
    // this.outgoingMessage$ = this.store.pipe(
    //   select(data => console.log(data.ui.person.name))
    // );
    // this.outgoingMessage$ = this.store.pipe(select(data => data.ui.message));
    // this.outgoingMessage$ = this.store.pipe(
    //   select(data => data.ui.person.name)
    // );
  }
}
