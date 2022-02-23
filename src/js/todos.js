import { createAction } from "@reduxjs/toolkit";
import { Dispatcher, ReduceStore } from "./flux";
import { generate as id } from "shortid";
import produce from "immer";
import { tasks } from "./data";

const todoCreated = createAction("todoCreated");
const todoCompleted = createAction("todoCompleted");
const showTodoCompleted = createAction("showTodoCompleted");

/*  =============== reducers */
class TodoReducerStore extends ReduceStore {
  getInitialState() {
    return {
      tasks,
      showCompleted: true,
    };
  }
  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case todoCreated.type:
        return produce(state, (draftState) => {
          draftState.tasks.push({
            id: id(),
            content: payload.content,
            completed: false,
          });
        });

      case todoCompleted.type:
        return produce(state, (draftState) => {
          const idx = state.tasks.findIndex((t) => t.id === payload.id);
          draftState.tasks[idx].completed = payload.completed;
        });
      case showTodoCompleted.type:
        return produce(state, (draftState) => {
          draftState.showCompleted = payload.show;
        });
    }

    return state;
  }
}

const todoDispatcher = new Dispatcher();
const todoStore = new TodoReducerStore(todoDispatcher);
window.store = todoStore;
/*  =============== view */
const tasksSection = document.getElementById("tasks");
const historyLengthBtn = document.getElementById("history-length");

function renderHistoryButton() {
  historyLengthBtn.textContent = todoStore.hasHistory
    ? ` - ${todoStore.history.length}`
    : "";
  historyLengthBtn.parentNode.disabled = !todoStore.hasHistory;
}

function TaskCompponent({ id, content, completed }) {
  return `<section>
      <label for="todo-${id}">${content}</label>
      <input type="checkbox" id="todo-${id}"
           name="todoCheck" data-id="${id}"
           ${completed ? "checked" : ""}
      />
   </section>`;
}

function render({ showCompleted, tasks }) {
  tasksSection.innerHTML = tasks
    .filter((t) => (showCompleted ? true : !t.completed))
    .map(TaskCompponent)
    .join("");
}

render(todoStore.getState());
renderHistoryButton();
todoStore.subscribe(render);
todoStore.subscribe(renderHistoryButton);

/*  ============ events */
document.addEventListener("submit", handle);
document.addEventListener("change", handle);
document.addEventListener("click", handle);

function handle(e) {
  const { type, target } = e;

  switch (type) {
    case "submit":
      if (target.name !== "newTask") {
        return;
      }
      e.preventDefault();
      const content = target.newTaskName.value.trim();
      if (content) {
        todoDispatcher.dispatch(todoCreated({ content }));
        target.newTaskName.value = "";
      }
      break;
    case "change":
      if (target.name === "todoCheck") {
        const id = target.dataset.id;
        const completed = target.checked;
        todoDispatcher.dispatch(todoCompleted({ id, completed }));
      } else if (target.name === "showCompleted") {
        const show = target.checked;
        todoDispatcher.dispatch(showTodoCompleted({ show }));
      }
      break;
    case "click":
      if (target.id === "undo") {
        if (todoStore.hasHistory) {
          todoStore.revertHistory();
        }
      }
      break;
  }
}
