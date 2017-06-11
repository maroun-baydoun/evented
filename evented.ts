
export class Evented {

    private listeners: { [eventName: string]: Array<Listener>};
    private static globalListeners: { [eventName: string]: Array<Listener>} = {};

    constructor() {

        this.listeners = {};
    }

    on<T>(eventName: string, listener: Listener<T>): () => void {

        return Evented._on<T>(this, eventName, listener);

    }

    off(eventName: string, listener: Listener): void {

        Evented._off(this, eventName, listener);
    }

    fire<T>(eventName: string, eventArgs?: T, eventTarget: Object = this): void {

        Evented._fire<T>(this, eventName, eventArgs, eventTarget);
    }

    listensTo(eventName: string): boolean {

        return Evented._listensTo(this, eventName);
    }

    static fire<T>(eventName: string, eventArgs?: T, eventTarget?: Object ): void {

        Evented._fire<T>(undefined, eventName, eventArgs, eventTarget);
    }

    static on<T>(eventName: string, listener: Listener<T>): () => void {

        return Evented._on<T>(undefined, eventName, listener);
    }

    static off(eventName: string, listener: Listener): void {

        Evented._off(undefined, eventName, listener);
    }

    static listensTo(eventName: string): boolean {

        return Evented._listensTo(undefined, eventName);
    }

    private static _on<T>(instance: Evented | undefined, eventName: string, listener: Listener<T>): () => void {

        let listeners: { [eventName: string]: Array<Listener>};

        if (instance) {
            listeners = instance.listeners;
        } else {
            listeners = Evented.globalListeners;
        }

        if (listeners[eventName] === undefined) {
            listeners[eventName] = [];
        }

        listeners[eventName].push(listener);

        return () => {
          Evented._off(instance, eventName, listener);
        };

    }

    private static _off(instance: Evented | undefined, eventName: string, listener: Listener): void {

        let listeners: { [eventName: string]: Array<Listener>},
            eventListeners: Listener[],
            i: number,
            length: number;


        if (instance) {
            listeners = instance.listeners;
        } else {
            listeners = Evented.globalListeners;
        }

        if (listeners[eventName] instanceof Array) {
            eventListeners = listeners[eventName];
            i = 0;
            length = eventListeners.length;
            for (; i < length; i++) {
                if (eventListeners[i] === listener) {
                    eventListeners.splice(i, 1);
                    break;
                }
            }
        }

    }

    private static _fire<T>(instance: Evented | undefined, eventName: string, eventArgs?: T, eventTarget?: Object): void {

        let listeners: { [eventName: string]: Array<Listener>},
            eventListeners: Listener[],
            i: number,
            length: number,
            thisArg: any;

        if (instance) {
            listeners = instance.listeners;
            thisArg = instance;
        } else {
            listeners = Evented.globalListeners;
            thisArg = Evented;
        }

        if (listeners[eventName] instanceof Array) {
            eventListeners = listeners[eventName];
            length = eventListeners.length;
            i = 0;

            for (; i < length; i++) {
                eventListeners[i].call(thisArg, new Event(eventName, eventArgs, eventTarget));
            }
        }
    }

    private static _listensTo(instance: Evented | undefined, eventName: string): boolean {

        let listeners: { [eventName: string]: Array<Listener>};

        if (instance) {
            listeners = instance.listeners;
        } else {
            listeners = Evented.globalListeners;
        }

        return (listeners[eventName] instanceof Array && listeners[eventName].length > 0);
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
