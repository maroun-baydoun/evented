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

 class Evented {
  private listeners: Array<Function>;
  private static globalListeners: Array<Function> = [];
  constructor() {
    this.listeners = [];
  }

  on(eventName: string, listener: Function): void {
    if (this.listeners[eventName] === undefined) {
        this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(listener);

  }

  off(eventName: string, listener: Function): void {

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
              listeners[i].call(this, {"name": eventName, "args": eventArgs, "target": eventTarget} );
          }
      }
  }


  static fire(eventName: string, eventArgs: Object = undefined, eventTarget: Object = undefined): void {
    if (Evented.globalListeners[eventName] instanceof Array) {
      var listeners = Evented.globalListeners[eventName],
          i = 0,
          len = listeners.length;
        for (; i < len; i++) {
            listeners[i].call(Evented, {"name": eventName, "args": eventArgs, "target": eventTarget});
        }
    }
  }

  static on(eventName: string, listener: Function): void {
    if (Evented.globalListeners[eventName] === undefined) {
      Evented.globalListeners[eventName] = [];
    }

    Evented.globalListeners[eventName].push(listener);
  }

  static off(eventName: string, listener: Function): void {
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
}

export = Evented;
