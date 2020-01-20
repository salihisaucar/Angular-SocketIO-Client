import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { appReducer } from "./app.reducer";

import { AppComponent } from "./app.component";
import { ContainerComponent } from "./container/container.component";
import { InboxPeopleComponent } from "./inbox-people/inbox-people.component";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { MessageHistoryPanelComponent } from "./message-history-panel/message-history-panel.component";
import { IncomingMessageComponent } from "./incoming-message/incoming-message.component";
import { OutgoingMessageComponent } from "./outgoing-message/outgoing-message.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    InboxPeopleComponent,
    ChatListComponent,
    MessageHistoryPanelComponent,
    IncomingMessageComponent,
    OutgoingMessageComponent,
    LoginComponent
  ],
  imports: [BrowserModule, StoreModule.forRoot({ ui: appReducer })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
