import { createStore, combineReducers } from "redux";
import { data } from "./data";
import { generate as id } from "shortid";

const PLAYER_STATUS = "PLAYER_STATUS";
const PLAYER_ADD = "PLAYER_ADD";

const defaultState = {
  filterStatus: -1,
  players: data.players,
  statuses: data.statuses,
};

const renderStatuses = data.statuses.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

// ======== Actions ========
const playerAddAction = (playerName) => ({
  type: PLAYER_ADD,
  payload: { playerName },
});

const playerStatusAction = (status) => ({
  type: PLAYER_STATUS,
  payload: { status },
});

// ======== Reducers ========
const playerAddReducer = (state = defaultState.players, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAYER_ADD: {
      return [
        { id: id(), name: payload.playerName, result: 0, status: 3 },
        ...state,
      ];
    }
    default:
      return state;
  }
};

const playerStatusReducer = (state = defaultState.filterStatus, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAYER_STATUS: {
      return payload.status;
    }
    default:
      return state;
  }
};

const statusesReducer = (state = defaultState.statuses, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  filterStatus: playerStatusReducer,
  players: playerAddReducer,
  statuses: statusesReducer,
});

// ======== Store ========
const playerStore = createStore(reducers);

// ======== Views ========
const statusesSelect = document.getElementById("status-select");
const playersTable = document.getElementById("results");

function PlayerRow(index, player, status) {
  return `<${player.status === status ? "tr class=table-info" : "tr"}>
            <td>${index}</td>
            <td>${player.name}</td>
            <td>${player.result}</td>
            <td>${renderStatuses[player.status].title}</td>
        </tr>`;
}

function Options() {
  const { statuses, filterStatus } = playerStore.getState();
  return (
    '<option value="-1">Status</option>\n' +
    statuses
      .map(
        (status) =>
          `<option value="${status.id}"  ${
            status.id === filterStatus ? "selected" : ""
          } >${status.title}</option>`
      )
      .join("")
  );
}

function render() {
  const { filterStatus, players } = playerStore.getState();
  playersTable.innerHTML = players
    .map((player, index) => PlayerRow(index, player, filterStatus))
    .join("");
  statusesSelect.innerHTML = Options();
}

playerStore.subscribe(render);
render();

// ======== Events ========
document.addEventListener("submit", handlerSubmit);
document.addEventListener("change", handlerChange);

function handlerSubmit(e) {
  const { target } = e;
  e.preventDefault();
  if (target.name.name !== "name") {
    return;
  }
  const playerName = target.name.value.trim();
  if (playerName) {
    playerStore.dispatch(playerAddAction(playerName));
    target.name.value = "";
  }
}

function handlerChange(e) {
  const { target } = e;
  if (target.id === "status-select") {
    playerStore.dispatch(playerStatusAction(Number(target.value)));
  }
}
