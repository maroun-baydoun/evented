# evented-ts

[![npm version](https://badge.fury.io/js/evented-ts.svg)](https://www.npmjs.com/package/evented-ts)

Fire and listen to events in JavaScript and TypeScript with a small, dependency-free event emitter.

## Installation

```shell
npm install evented-ts
```

```shell
pnpm add evented-ts
```

```shell
yarn add evented-ts
```

## Usage

```typescript
import create from "evented-ts";

const evented = create();

const stopListening = evented.on("hello", (event) => {
  console.log(event.args);
});

evented.fire("hello", "world");
stopListening();
```

Listeners receive an event object with the event `name` and optional `args`:

```typescript
evented.on<{ userId: string }>("user:created", (event) => {
  console.log(event.name); // "user:created"
  console.log(event.args?.userId);
});

evented.fire("user:created", { userId: "123" });
```

## API

### `create()`

Creates an isolated event emitter. Each emitter has its own listener registry.

### `evented.on(eventName, listener)`

Registers a listener for `eventName` and returns a function that removes that listener.

```typescript
const stop = evented.on("message", (event) => {
  console.log(event.args);
});

stop();
```

### `evented.fire(eventName, eventArgs?)`

Fires an event and passes its name and optional arguments to every registered listener.

### `evented.off(eventName, listener?)`

Removes a specific listener. When `listener` is omitted, all listeners for the event are removed.

```typescript
const listener = (event: Event) => {
  console.log(event.args);
};

evented.on("message", listener);
evented.off("message", listener);
evented.off("message");
```

### `evented.listensTo(eventName)`

Returns `true` when the event has one or more listeners, otherwise `false`.

### `evented.listeners(eventName)`

Returns the registered listeners for an event, or `undefined` when no listeners have been registered.

## TypeScript

`Event<T>` and `Listener<T>` are exported for use in typed integrations:

```typescript
import type { Event, Listener } from "evented-ts";
```

## License

MIT © [Maroun Baydoun](https://maroun-baydoun.com/)
