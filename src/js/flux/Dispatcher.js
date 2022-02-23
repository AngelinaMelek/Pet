export class Dispatcher {
  constructor() {
    this._listeners = [];
  }

  dispatch(action) {
    this._listeners.forEach((l) => l(action));
  }

  register(listener) {
    this._listeners.push(listener);
  }
}
