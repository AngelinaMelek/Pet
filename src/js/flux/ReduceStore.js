import { Store } from "./Store";

export class ReduceStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this._history = [];
  }
  reduce(state, action) {
    throw Error("reducer must be overriden in subclasses");
  }
  onDispatch(action) {
    const newState = this.reduce(this.state, action);
    if (newState !== this.state) {
      this._history.push(this.state);
      this.state = newState;
      this.emitChange();
    }
  }
  get history() {
    return this._history;
  }
  get hasHistory() {
    return this._history.length;
  }
  revertHistory() {
    if (this.hasHistory) {
      this.state = this._history.pop();
    }
    this.emitChange();
  }
}
