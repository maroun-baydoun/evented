
export class Evented {

    private listeners: Array<Listener>;
    private static globalListeners: Array<Listener> = [];

    constructor() {

        this.listeners = [];
    }

    on(eventName: string, listener: Listener): void {

        Evented._on(this, eventName, listener);

    }

    off(eventName: string, listener: Listener): void {

        Evented._off(this, eventName, listener);
    }

    fire(eventName: string, eventArgs: Object = undefined, eventTarget: Object = this): void {

        Evented._fire(this, eventName, eventArgs, eventTarget);
    }

    listensTo(eventName: string): boolean {

        return Evented._listensTo(this, eventName);
    }

    static fire(eventName: string, eventArgs: Object = undefined, eventTarget: Object = undefined): void {

        Evented._fire(undefined, eventName, eventArgs, eventTarget);
    }

    static on(eventName: string, listener: Listener): void {

        Evented._on(undefined, eventName, listener);
    }

    static off(eventName: string, listener: Listener): void {

        Evented._off(undefined, eventName, listener);
    }

    static listensTo(eventName: string): boolean {

        return Evented._listensTo(undefined, eventName);
    }

    private static _on(instance: Evented, eventName: string, listener: Listener): void {

        var listeners: Listener[];

        if (instance) {
            listeners = instance.listeners;
        } else {
            listeners = Evented.globalListeners;
        }

        if (listeners[eventName] === undefined) {
            listeners[eventName] = [];
        }

        listeners[eventName].push(listener);

    }

    private static _off(instance: Evented, eventName: string, listener: Listener): void {

        var listeners: Listener[],
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
            length = listeners.length;
            for (; i < length; i++) {
                if (eventListeners[i] === listener) {
                    eventListeners.splice(i, 1);
                    break;
                }
            }
        }

    }

    private static _fire(instance: Evented, eventName: string, eventArgs: Object = undefined, eventTarget: Object = undefined): void {

        var listeners: Listener[],
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

    private static _listensTo(instance: Evented, eventName: string): boolean {

        var listeners: Listener[];

        if (instance) {
            listeners = instance.listeners;
        } else {
            listeners = Evented.globalListeners;
        }

        return (listeners[eventName] instanceof Array && listeners[eventName].length > 0);
    }
}

export class Event {
    private _name: string;
    private _args: any;
    private _target: Object;

    constructor(name: string, args?: any, target?: Object) {
        this._name = name;
        this._args = args;
        this._target = target;
    }

    get name(): string {
        return this._name;
    }

    get args(): any {
        return this._args;
    }

    get target(): Object {
        return this._target;
    }
}

export interface Listener {
    (event: Event): void;
};
