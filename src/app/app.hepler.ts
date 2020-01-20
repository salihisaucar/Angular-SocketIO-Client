export function copy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = typeof v === "object" ? copy(v) : v;
  }
  return output;
}

export function setOnlineUser(chatPanelArr, userId) {
  let newArr = copy(chatPanelArr);
  for (let index = 0; index < newArr.length; index++) {
    const id = newArr[index].userId;
    if (id == userId) {
      newArr[index].userAuthenticationStatus = "online";
    }
  }
  return newArr;
}

export function updateNewMessageClass(chatPanelArr, token) {
  let newArr = copy(chatPanelArr);

  for (let index = 0; index < newArr.length; index++) {
    const conversationToken = newArr[index].conversationToken;
    if (conversationToken == token) {
      newArr[index].newMessageClass = "";
    }
  }
  return newArr;
}

export function updateUserLastMessageTextOnChatPanel(chatPanelArr, userData) {
  let newArr = [];
  if ("priority" in userData) {
    newArr = setPriority(chatPanelArr, userData);
  } else newArr = copy(chatPanelArr);

  for (let index = 0; index < newArr.length; index++) {
    const conversationToken = newArr[index].conversationToken;
    if (conversationToken == userData.conversationToken) {
      newArr[index].userLastMessage = userData.message;
      if ("newMessageClass" in userData)
        newArr[index].newMessageClass = userData.newMessageClass;
    }
  }
  return newArr;
}

function setPriority(arr, priorityData) {
  let newArr = copy(arr);
  let arrItemList = [];
  const priorityItem = newArr.find(
    data => data.conversationToken == priorityData.conversationToken
  );
  arrItemList.push(priorityItem);
  for (let index = 0; index < newArr.length; index++) {
    if (newArr[index].conversationToken != priorityData.conversationToken) {
      const element = newArr[index];
      arrItemList.push(element);
    }
  }
  return arrItemList;
}

export function updateMessageHistory(arr, messageObj) {
  let newArr = copy(arr);
  newArr.push(messageObj);
  return newArr;
}
