export class Evented {
  private _listeners: ListenerDictionary;
  private static globalListeners: ListenerDictionary = {};

  constructor() {
    this._listeners = {};
  }

  on<T>(eventName: string, listener: Listener<T>): () => void {
    return Evented._on<T>(eventName, listener, this);
  }

  off(eventName: string, listener?: Listener): void {
    Evented._off(eventName, listener, this);
  }

  fire<T>(eventName: string, eventArgs?: T, eventTarget: Object = this): void {
    Evented._fire<T>(this, eventName, eventArgs, eventTarget);
  }

  listensTo(eventName: string): boolean {
    return Evented._listensTo(this, eventName);
  }

  listeners(eventName: string): Listener[] | undefined {
    return Evented._listeners(this, eventName);
  }

  static fire<T>(eventName: string, eventArgs?: T, eventTarget?: Object): void {
    Evented._fire<T>(undefined, eventName, eventArgs, eventTarget);
  }

  static on<T>(eventName: string, listener: Listener<T>): () => void {
    return Evented._on<T>(eventName, listener);
  }

  static off(eventName: string, listener?: Listener): void {
    Evented._off(eventName, listener);
  }

  static listensTo(eventName: string): boolean {
    return Evented._listensTo(undefined, eventName);
  }

  static listeners(eventName: string): Listener[] | undefined {
    return Evented._listeners(undefined, eventName);
  }

  private static _on<T>(
    eventName: string,
    listener: Listener<T>,
    instance?: Evented
  ): () => void {
    const listeners: ListenerDictionary = instance
      ? instance._listeners
      : Evented.globalListeners;

    if (listeners[eventName] === undefined) {
      listeners[eventName] = [];
    }

    listeners[eventName]!.push(listener);

    return () => Evented._off(eventName, listener, instance);
  }

  private static _off(
    eventName: string,
    listener?: Listener,
    instance?: Evented
  ): void {
    const listeners: ListenerDictionary = instance
      ? instance._listeners
      : Evented.globalListeners;
    const eventListeners: Listener[] | undefined = listeners[eventName];

    if (eventListeners instanceof Array) {
      if (!listener) {
        listeners[eventName] = undefined;
      } else {
        listeners[eventName] = eventListeners.filter((l) => l !== listener);
      }
    }
  }

  private static _fire<T>(
    instance: Evented | undefined,
    eventName: string,
    eventArgs?: T,
    eventTarget?: Object
  ): void {
    const listeners: ListenerDictionary = instance
      ? instance._listeners
      : Evented.globalListeners;
    const thisArg: Evented | typeof Evented = instance || Evented;

    const eventListeners: Listener[] | undefined = listeners[eventName];

    if (eventListeners instanceof Array) {
      eventListeners.forEach((l) => {
        l.call(thisArg, new Event(eventName, eventArgs, eventTarget));
      });
    }
  }

  private static _listensTo(
    instance: Evented | undefined,
    eventName: string
  ): boolean {
    const listeners: ListenerDictionary = instance
      ? instance._listeners
      : Evented.globalListeners;

    return (
      listeners[eventName] instanceof Array && listeners[eventName]!.length > 0
    );
  }

  private static _listeners(
    instance: Evented | undefined,
    eventName: string
  ): Listener[] | undefined {
    const listeners: ListenerDictionary = instance
      ? instance._listeners
      : Evented.globalListeners;

    return listeners[eventName];
  }
}

export class Event<T = any> {
  private _name: string;
  private _args: T | undefined;
  private _target: Object | undefined;

  constructor(name: string, args?: T, target?: Object) {
    this._name = name;
    this._args = args;
    this._target = target;
  }

  get name(): string {
    return this._name;
  }

  get args(): T | undefined {
    return this._args;
  }

  get target(): Object | undefined {
    return this._target;
  }
}

export type Listener<T = any> = (event: Event<T>) => void;
type ListenerDictionary = { [eventName: string]: Listener[] | undefined };
