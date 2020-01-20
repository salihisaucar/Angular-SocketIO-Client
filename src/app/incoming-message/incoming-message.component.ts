import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-incoming-message",
  templateUrl: "./incoming-message.component.html",
  styleUrls: ["./incoming-message.component.css"]
})
export class IncomingMessageComponent implements OnInit {
  constructor() {}

  @Input() message: String;

  ngOnInit() {}
}
