import { MessageService } from "../services/message.service";
import { Observable } from "rxjs/observable";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import io from "socket.io-client";

import * as fromAppReducer from "../app.reducer";
import * as fromActions from "src/app/app.actions";
import * as fromEnums from "src/app/app.enums";

@Component({
  selector: "app-message-history-panel",
  templateUrl: "./message-history-panel.component.html",
  styleUrls: ["./message-history-panel.component.css"]
})
export class MessageHistoryPanelComponent implements OnInit {
  private socket: any;
  private messageObj: any;
  private urlReciver: string = fromEnums.SocketUrl.url;
  private token: String = "";
  private userId: number = 0;
  private isTypingActive: boolean = false;
  message: string = "";
  messageHistoryList: Array<any>;
  messageHistoryToken$: Observable<String>;
  userId$: Observable<any>;

  constructor(
    private service: MessageService,
    private store: Store<{ ui: fromAppReducer.State }>
  ) {}

  sendTypingInformation(event) {
    this.socket.emit(fromEnums.SocketIO.SocketTag, {
      room: this.token,
      userId: this.userId,
      message: fromEnums.SocketIOMessage.Typing
    });
  }

  sendMessage() {
    this.messageObj = {
      senderId: this.userId,
      room: this.token,
      message: this.message
    };
    this.socket.emit(fromEnums.SocketIO.SocketTag, this.messageObj);

    this.store.dispatch({
      type: fromActions.UPDATE_MESSAGE_HISTORY,
      payload: {
        tokenId: this.token,
        userId: this.userId,
        message: this.message
      }
    });

    this.message = "";
  }
  openConversationConnection() {
    //All tokens data is getting to create a connection of socket's room
    const tokenList = this.service.getUserTokenList(this.userId);
    for (let index = 0; index < tokenList.length; index++) {
      const connectionObj = {
        senderId: this.userId,
        room: tokenList[index],
        message: fromEnums.SocketIOMessage.Connected,
        connectioncompleted: false //it was created for connection circle
      };
      this.socket.emit(fromEnums.SocketIO.SocketTag, connectionObj);
    }
  }

  ngOnInit() {
    // user's message history is getting
    this.userId$ = this.store.pipe(select(state => state.ui.userId));
    this.userId$.subscribe(data => (this.userId = data));

    this.messageHistoryToken$ = this.store.pipe(
      select(data => data.ui.messageHistoryToken)
    );
    this.messageHistoryToken$.subscribe(
      data => (
        (this.token = data),
        (this.messageHistoryList = this.service.getMessageDetail(data))
      )
    );
    //-------------------------------------

    this.socket = io(this.urlReciver);

    this.socket.on(fromEnums.SocketIO.SocketTag, message => {
      this.isTypingActive = false;

      // this code was written for the online process
      if (message.message == fromEnums.SocketIOMessage.Connected) {
        this.store.dispatch({
          type: fromActions.SET_ONLINE_USER,
          payload: message.senderId
        });
        // when the second user gets this request that contains the first user's login information.
        //The circle of the online process is done.
        if (message.connectioncompleted == false) {
          const connectionObj = {
            senderId: this.userId,
            room: message.room,
            message: fromEnums.SocketIOMessage.Connected,
            connectioncompleted: true
          };
          this.socket.emit(fromEnums.SocketIO.SocketTag, connectionObj);
        }
      }
      //-------------------------------------------
      // Typing ----------------
      if (
        message.message == fromEnums.SocketIOMessage.Typing &&
        message.userId != this.userId &&
        message.room == this.token
      ) {
        this.isTypingActive = true;
        return;
      } else if (
        message.message == fromEnums.SocketIOMessage.Typing &&
        message.userId == this.userId &&
        message.room == this.token
      ) {
        this.isTypingActive = false;
        return;
      }
      // Typing------------------

      if (
        message.message != fromEnums.SocketIOMessage.Connected &&
        message.message != fromEnums.SocketIOMessage.Typing
      ) {
        if (message.room == this.token) {
          //if the connection was created smoothly and the user sent a message,
          //room information is being checked if the user's room is the same room with
          //the receiver's user this code runs
          const data = {
            userId: message.senderId,
            message: message.message
          };
          this.messageHistoryList.push(data);
          this.store.dispatch({
            type: fromActions.UPDATE_USER_LAST_MESSAGE_ON_CHAT_PANEL,
            payload: {
              conversationToken: this.token,
              message: message.message
            }
          });
        } else {
          //if the user's room is not the same room with the receiver's user this code runs
          // this code runs because our system has to inform ngrx store
          this.store.dispatch({
            type: fromActions.UPDATE_USER_LAST_MESSAGE_ON_CHAT_PANEL,
            payload: {
              conversationToken: message.room,
              message: message.message,
              newMessageClass: fromEnums.MessageClass.NewMessageClass,
              priority: true
            }
          });
        }
        // this code is updating our message table( we dont have db table :) it is just array :))
        this.store.dispatch({
          type: fromActions.UPDATE_MESSAGE_HISTORY,
          payload: {
            tokenId: message.room,
            userId: message.senderId,
            message: message.message
          }
        });
      }
    });
    this.openConversationConnection();
  }
}
