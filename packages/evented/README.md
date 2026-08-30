# evented-ts

[![npm version](https://badge.fury.io/js/evented-ts.svg)](https://www.npmjs.com/package/evented-ts)

Fire and listen to events in JavaScript.

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

evented.on("hello", (event) => {
  console.log(event.args);
});

evented.fire("hello", "world");
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

// Remove only this listener.
evented.off("message", listener);

// Remove all listeners for "message".
evented.off("message");
```

### `evented.listensTo(eventName)`

Returns `true` when the event has one or more listeners, otherwise `false`.

### `evented.listeners(eventName)`

Returns the registered listeners for an event, or `undefined` when no listeners have been registered.

## License

MIT © [Maroun Baydoun](https://maroun-baydoun.com/)
