import { createStore, combineReducers } from "redux";
import { messages } from "./data";

const CREATE_MESSAGE = "CREATE_MESSAGE";
const UPDATE_STATUS = "UPDATE_STATUS";
const ONLINE = "ONLINE";

const statusUpdateAction = (value) => ({
  type: UPDATE_STATUS,
  payload: { value },
});

const createMessageAction = (content, postedBy) => ({
  type: CREATE_MESSAGE,
  payload: { date: new Date().toISOString(), content, postedBy },
});

const defaultState = {
  messages,
  userStatus: ONLINE,
};

const userStatusReducer = (state = defaultState.userStatus, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_STATUS:
      return payload.value;
    default:
      return state;
  }
};

const messagesReducer = (state = defaultState.messages, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_MESSAGE:
      const { date, content, postedBy } = payload;
      return [{ date, content, postedBy }, ...state];
    default:
      return state;
  }
};

const reducers = combineReducers({
  userStatus: userStatusReducer,
  messages: messagesReducer,
});
const store = createStore(reducers);
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
        store.dispatch(createMessageAction(content, postedBy));
      }
      break;
    case "change":
      if (target.name === "status") {
        const value = target.value;
        store.dispatch(statusUpdateAction(value));
      }
  }
}
