export class Evented {
  private _listeners: ListenerDictionary;
  private static globalListeners: ListenerDictionary = {};

  constructor() {
    this._listeners = {};
  }

  on<T>(eventName: string, listener: Listener<T>): () => void {
    return Evented._on<T>(this, eventName, listener);
  }

  off(eventName: string, listener?: Listener): void {
    Evented._off(eventName, this, listener);
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
    return Evented._on<T>(undefined, eventName, listener);
  }

  static off(eventName: string, listener?: Listener): void {
    Evented._off(eventName, undefined, listener);
  }

  static listensTo(eventName: string): boolean {
    return Evented._listensTo(undefined, eventName);
  }

  static listeners(eventName: string): Listener[] | undefined {
    return Evented._listeners(undefined, eventName);
  }

  private static _on<T>(
    instance: Evented | undefined,
    eventName: string,
    listener: Listener<T>
  ): () => void {
    let listeners: ListenerDictionary;

    if (instance) {
      listeners = instance._listeners;
    } else {
      listeners = Evented.globalListeners;
    }

    if (listeners[eventName] === undefined) {
      listeners[eventName] = [];
    }

    listeners[eventName]!.push(listener);

    return () => Evented._off(eventName, instance, listener);
  }

  private static _off(
    eventName: string,
    instance?: Evented,
    listener?: Listener
  ): void {
    let eventListeners: Listener[] | undefined, listeners: ListenerDictionary;

    if (instance) {
      listeners = instance._listeners;
    } else {
      listeners = Evented.globalListeners;
    }

    eventListeners = listeners[eventName];

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
    let eventListeners: Listener[] | undefined,
      listeners: ListenerDictionary,
      thisArg: Evented | typeof Evented;

    if (instance) {
      listeners = instance._listeners;
      thisArg = instance;
    } else {
      listeners = Evented.globalListeners;
      thisArg = Evented;
    }

    eventListeners = listeners[eventName];

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
    let listeners: ListenerDictionary;

    if (instance) {
      listeners = instance._listeners;
    } else {
      listeners = Evented.globalListeners;
    }

    return (
      listeners[eventName] instanceof Array && listeners[eventName]!.length > 0
    );
  }

  private static _listeners(
    instance: Evented | undefined,
    eventName: string
  ): Listener[] | undefined {
    let listeners: ListenerDictionary;

    if (instance) {
      listeners = instance._listeners;
    } else {
      listeners = Evented.globalListeners;
    }

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
