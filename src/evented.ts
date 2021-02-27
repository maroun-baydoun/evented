export type Event<T = any> = {
  name: string;
  args?: T;
};
export type Listener<T = any> = (event: Event<T>) => void;
type ListenerDictionary = { [eventName: string]: Listener[] | undefined };

const create = () => {
  const _listeners: ListenerDictionary = {};

  const on = <T>(eventName: string, listener: Listener<T>): (() => void) => {
    if (_listeners[eventName] === undefined) {
      _listeners[eventName] = [];
    }

    _listeners[eventName]!.push(listener);

    return () => off(eventName, listener);
  };

  const off = (eventName: string, listener?: Listener): void => {
    const eventListeners: Listener[] | undefined = _listeners[eventName];

    if (eventListeners instanceof Array) {
      if (!listener) {
        _listeners[eventName] = undefined;
      } else {
        _listeners[eventName] = eventListeners.filter((l) => l !== listener);
      }
    }
  };

  const fire = <T>(eventName: string, eventArgs?: T): void => {
    const eventListeners: Listener[] | undefined = _listeners[eventName];

    if (eventListeners instanceof Array) {
      eventListeners.forEach((l) => {
        l.call(null, {
          name: eventName,
          args: eventArgs,
        });
      });
    }
  };

  const listensTo = (eventName: string): boolean => {
    return (
      _listeners[eventName] instanceof Array &&
      _listeners[eventName]!.length > 0
    );
  };

  const listeners = (eventName: string): Listener[] | undefined => {
    return _listeners[eventName];
  };

  return {
    on,
    off,
    fire,
    listensTo,
    listeners,
  };
};

export default create;
