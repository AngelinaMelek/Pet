import { createAction, configureStore, createReducer } from "@reduxjs/toolkit";
import { messages } from "./data";

const online = createAction("online");
const statusUpdated = createAction("statusUpdated");
const messageCreated = createAction("messageCreated");

const defaultState = {
  messages,
  userStatus: online.type,
};

const reducer = createReducer(defaultState, {
  [messageCreated.type]: (state, action) => {
    state.messages.push(action.payload);
  },
  [statusUpdated.type]: (state, action) => {
    state.userStatus = action.payload.value;
  },
});

const store = configureStore({ reducer: reducer });
window.store = store;
store.subscribe(console.log);

function sortByDate(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
const render = () => {
  const { messages, userStatus } = store.getState();
  document.getElementById("messages").innerHTML = messages
    .slice()
    .sort(sortByDate)
    .map((message) => `<div>${message.content}: ${message.postedBy}</div>`)
    .join("");

  document.forms.newMessage.fields.disabled = userStatus === "offline";
  document.forms.newMessage.message.value = "";
};

render();
store.subscribe(render);

/*  =========== handler  */
document.addEventListener("change", handle);
document.addEventListener("submit", handle);

function handle(e) {
  const { target, type } = e;
  switch (type) {
    case "submit":
      e.preventDefault();
      if (target.name === "newMessage") {
        const content = target.message.value.trim();
        const postedBy = localStorage["preference"]
          ? JSON.parse(localStorage["preference"]).userName
          : "Jim";
        const date = new Date().toISOString();
        store.dispatch(messageCreated({ postedBy, content, date }));
      }
      break;
    case "change":
      if (target.name === "status") {
        const value = target.value;
        store.dispatch(statusUpdated({ value }));
      }
  }
}
