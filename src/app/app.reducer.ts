import * as fromActions from "src/app/app.actions";
import * as appHelper from "../app/app.hepler";
import * as appDb from "../app/database/database";

export interface State {
  userId: number;
  messageHistory: Array<any>;
  chatPanel: Array<any>;
  messageHistoryToken: String;
}

const initialState: State = {
  userId: 0,
  chatPanel: [],
  messageHistory: appDb.messageDetail,
  messageHistoryToken: ""
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case fromActions.SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload
      });
    case fromActions.CHANGE_MESSAGE_HISTORY_TOKEN:
      return Object.assign({}, state, {
        messageHistoryToken: action.payload
      });
    case fromActions.UPDATE_CHAT_PANEL:
      return Object.assign({}, state, {
        chatPanel: action.payload,
        messageHistoryToken: action.payload[0].conversationToken
      });
    case fromActions.SET_ONLINE_USER:
      return Object.assign({}, state, {
        chatPanel: appHelper.setOnlineUser(state.chatPanel, action.payload)
      });
    case fromActions.UPDATE_USER_LAST_MESSAGE_ON_CHAT_PANEL:
      return Object.assign({}, state, {
        chatPanel: appHelper.updateUserLastMessageTextOnChatPanel(
          state.chatPanel,
          action.payload
        )
      });
    case fromActions.CHANGE_NEW_MESSAGE_CLASS:
      return Object.assign({}, state, {
        chatPanel: appHelper.updateNewMessageClass(
          state.chatPanel,
          action.payload
        )
      });
    case fromActions.UPDATE_MESSAGE_HISTORY:
      return Object.assign({}, state, {
        messageHistory: appHelper.updateMessageHistory(
          state.messageHistory,
          action.payload
        )
      });

    default:
      return state;
  }
}
