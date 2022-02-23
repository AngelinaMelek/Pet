export class Store {
  constructor(dispatcher) {
    this._listeners = [];
    this.state = this.getInitialState();
    dispatcher.register(this.onDispatch.bind(this));
  }
  getInitialState() {
    throw Error("getInitialState must be overrined in subclasses");
  }

  onDispatch(action) {
    throw Error("onDispatch must be overrined in subclasses");
  }
  subscribe(listener) {
    this._listeners.push(listener);
  }
  emitChange() {
    this._listeners.forEach((l) => l(this.state));
  }
  getState() {
    return this.state;
  }
}
