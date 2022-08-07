## Evented
##### Fire and listen to events in JavaScript

[![npm version](https://badge.fury.io/js/evented-ts.svg)](https://badge.fury.io/js/evented-ts)

#### Install

```shell
npm i evented-ts
```
Or

```shell
yarn add evented-ts
```

#### Usage
```typescript
import create from "evented-ts";


const evented = create();

evented.on("hello", (e) => console.log("hello", e.args));
            
evented.fire("hello", "world");
```

#### API

##### evented.fire(eventName: string, eventArgs?: any): void;

Fires an event with optional arguments.

##### evented.on(eventName: string, listener: (e: Event) => void): () => void;

Listens to an event. Returns a function that removes the listener when invoked.

##### evented.off(eventName: string, listener?: (e: Event) => void): void;

Removes the given listener for the event name. Otherwise removes all listeners for the event name.

##### evented.listensTo(eventName: string): boolean;

Returns whether listeners exist for a given event name.

##### evented.listeners(eventName: string): Array<(event: Event<T>) => void>;

Returns listeners for a given event name.


#### Demo

See it running in action in this [demo](https://dev.maroun-baydoun.com/evented/#demo).


#### License
MIT
Copyright (c) [Maroun Baydoun](https://maroun-baydoun.com/).
