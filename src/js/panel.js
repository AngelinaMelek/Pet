import { Dispatcher, Store } from "./flux";
import { panelData } from "./data";

/*  ================ action creators */
const CHANGE_USERNAME = "CHANGE_USERNAME";
const CHANGE_FONTSIZE = "CHANGE_FONTSIZE";

const userNameUpdate = (userName) => ({
  type: CHANGE_USERNAME,
  payload: { userName },
});
const fontSizeUpdate = (fontSize) => ({
  type: CHANGE_FONTSIZE,
  payload: { fontSize },
});

/*  ================ store */
class PanelStore extends Store {
  getInitialState() {
    return localStorage["preference"]
      ? JSON.parse(localStorage["preference"])
      : panelData;
  }
  onDispatch(action) {
    const { type, payload } = action;
    switch (type) {
      case CHANGE_USERNAME:
        this.state.userName = payload.userName;
        break;
      case CHANGE_FONTSIZE:
        this.state.fontSize = payload.fontSize;
        break;
    }

    this.emitChange();
  }
}

const panelDispatcher = new Dispatcher();
const panelStore = new PanelStore(panelDispatcher);
window.store = panelStore;

/*  ================ views */
const userNameEl = document.getElementById("userName");
const contentPageEl = document.getElementById("content-page");
const fontSizeEl = document.forms.fontSizeForm.fontSize;

function render({ userName, fontSize }) {
  userNameEl.innerHTML = userName;
  contentPageEl.style.fontSize = fontSize === "small" ? "16px" : "22px";
  fontSizeEl.value = fontSize;
  localStorage["preference"] = JSON.stringify({ userName, fontSize });
}

render(panelStore.getState());
panelStore.subscribe(render);

/*  ============= events */

document.addEventListener("input", handleChangeName);
document.addEventListener("change", handleChangeName);

function handleChangeName(e) {
  const { type, target } = e;
  switch (type) {
    case "input":
      if (target.id !== "userNameInput") {
        return;
      }
      const userName = target.value.trim();
      panelDispatcher.dispatch(userNameUpdate(userName));
      break;
    case "change":
      if (target.name !== "fontSize") {
        return;
      }
      const fontSize = target.value;
      panelDispatcher.dispatch(fontSizeUpdate(fontSize));
  }
}
