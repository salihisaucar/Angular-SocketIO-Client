import { Observable } from "rxjs/observable";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

import * as fromAppReducer from "src/app/app.reducer";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{ ui: fromAppReducer.State }>) {}
  userId$: Observable<number>;
  ngOnInit(): void {
    this.userId$ = this.store.pipe(select(data => data.ui.userId));
  }
}
