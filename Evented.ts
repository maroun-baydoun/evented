/*The MIT License (MIT)

Copyright (c) 2015 Maroun Baydoun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export class Evented {
    private listeners: Array<Listener>;
    private static globalListeners: Array<Listener> = [];
    constructor() {
        this.listeners = [];
    }

    on(eventName: string, listener: Listener): void {
        if (this.listeners[eventName] === undefined) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(listener);

    }

    off(eventName: string, listener: Listener): void {

        if (this.listeners[eventName] instanceof Array) {
            var listeners = this.listeners[eventName],
                i = 0,
                len = listeners.length;
            for (; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }

    fire(eventName: string, eventArgs: Object = undefined, eventTarget: Object = this): void {

        if (this.listeners[eventName] instanceof Array) {
            var listeners = this.listeners[eventName],
                i = 0,
                len = listeners.length;
            for (; i < len; i++) {
                listeners[i].call(this, new Event(eventName, eventArgs, eventTarget));
            }
        }
    }

    listensTo(eventName: string): boolean {
      return (this.listeners[eventName] instanceof Array && this.listeners[eventName].length > 0);
    }

    static fire(eventName: string, eventArgs: Object = undefined, eventTarget: Object = undefined): void {
        if (Evented.globalListeners[eventName] instanceof Array) {
            var listeners = Evented.globalListeners[eventName],
                i = 0,
                len = listeners.length;
            for (; i < len; i++) {
                listeners[i].call(Evented, new Event(eventName, eventArgs, eventTarget));
            }
        }
    }

    static on(eventName: string, listener: Listener): void {
        if (Evented.globalListeners[eventName] === undefined) {
            Evented.globalListeners[eventName] = [];
        }

        Evented.globalListeners[eventName].push(listener);
    }

    static off(eventName: string, listener: Listener): void {
        if (Evented.globalListeners[eventName] instanceof Array) {
            var listeners = Evented.globalListeners[eventName],
                i = 0,
                len = listeners.length;
            for (; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }

    static listensTo(eventName: string): boolean {
      return (Evented.globalListeners[eventName] instanceof Array && Evented.globalListeners[eventName].length > 0);
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

  get name(): string{
    return this._name;
  }

  get args(): any{
    return this._args;
  }

  get target(): Object{
    return this._target;
  }
}

export interface Listener {
    (event: Event): void;
};
