import { createSlice, configureStore } from "@reduxjs/toolkit";
import { generate as id } from "shortid";
import { data } from "./data";

const initialState = {
  statuses: data.statuses,
  players: data.players,
  selectStatus: -1,
};
const renderStatuses = data.statuses.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

const slice = createSlice({
  name: "players",
  initialState,
  reducers: {
    playerAdded: (state, action) => {
      state.players.unshift({ ...action.payload, result: 0, status: 3 });
    },
    statusSelected: (state, action) => {
      state.selectStatus = action.payload.selectStatus;
    },
  },
});

const store = configureStore({ reducer: slice.reducer });
const { playerAdded, statusSelected } = slice.actions;

const statusBox = document.getElementById("status-select");
const results = document.getElementById("results");

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.nodeName.toLowerCase() !== "form") return;
  const name = e.target.name.value.trim();
  store.dispatch(playerAdded({ id: id(), name }));
  e.target.name.value = "";
});

document.addEventListener("change", ({ target }) => {
  if (target.id !== "status-select") return;
  const selectStatus = target.value;
  store.dispatch(statusSelected({ selectStatus }));
});

const Option = (el, selectStatus) => {
  const { id, title } = el;
  return `<option  ${selectStatus == id ? "selected" : ""} value="${id}">
                ${title}
        </option>`;
};

const Row = (i, { id, name, result, status }, selectStatus) => {
  const renderStatus = renderStatuses[status].title;
  return `<tr class="${status === parseInt(selectStatus) ? "table-info" : ""}">
        <td>${i}</td>
        <td>${name}</td>
        <td>${result}</td>
        <td>${renderStatus}</td>
    </tr>`;
};

const render = () => {
  const { players, selectStatus, statuses } = store.getState();
  statusBox.innerHTML = `<option value = "-1">Status</option>`;
  statusBox.innerHTML += statuses
    .map((el) => Option(el, selectStatus))
    .join("");

  results.innerHTML = players
    .map((player, i) => Row(i, player, selectStatus))
    .join("");
};

render();
store.subscribe(render);
