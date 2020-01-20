import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/observable";
import { Injectable } from "@angular/core";

import * as fromAppReducer from "../app.reducer";

import * as db from "../database/database";
import { copy } from "../app.hepler";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  constructor(private store: Store<{ ui: fromAppReducer.State }>) {}
  messageHistory$: Observable<Array<any>>;

  getUserName(userId) {
    const userName = db.user.find(data => data.userId == userId).userName;
    return userName;
  }

  getChatPanelDataList(userId) {
    let chatPanelList = [];

    const userTokenList = db.userToken.filter(
      userToken => userToken.userId == userId
    );

    for (let index = 0; index < userTokenList.length; index++) {
      let userName = "";
      let userProfile = "";
      let userLastMessage = "";
      let chatPanelListObj = {};
      const token = userTokenList[index].token;
      // i am getting user information that does not contain user that has just logined
      const user = db.user.find(
        user =>
          user.userId ==
          db.userToken.find(x => x.token == token && x.userId != userId).userId
      );

      (userName = user.userName), (userProfile = user.userProfileImg);

      let userMessageDetails = copy(db.messageDetail);
      userMessageDetails = userMessageDetails.filter(
        detail => (detail.tokenId = token)
      );

      userLastMessage =
        userMessageDetails[userMessageDetails.length - 1].message;

      chatPanelListObj = {
        userId: user.userId,
        userAuthenticationStatus: "offline",
        userName: userName,
        userProfile: userProfile,
        userLastMessage: userLastMessage,
        conversationToken: token,
        newMessageClass: "",
        priority: false
      };
      chatPanelList.push(chatPanelListObj);
    }
    return chatPanelList;
  }

  getMessageDetail(tokenId) {
    let messageDetail = [];
    if (tokenId != "") {
      this.messageHistory$ = this.store.pipe(
        select(data => data.ui.messageHistory)
      );
      this.messageHistory$.subscribe(
        data =>
          (messageDetail = data.filter(detail => detail.tokenId == tokenId))
      );
    }
    return messageDetail;
  }
  getUserTokenList(userId) {
    const tokenList = copy(
      db.userToken.filter(data => data.userId == userId).map(data => data.token)
    );
    return tokenList;
  }
}
