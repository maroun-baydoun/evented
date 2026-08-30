import { describe, expect, it } from "vitest";
import evented from "../../evented/src/evented";

describe("Evented", () => {
  it("handles a fired event with on()", () => {
    const { on, fire } = evented();
    let fired = false;

    on<{ myArg: string }>("myEvent1", (event) => {
      fired = true;
      expect(event.args).toBeDefined();
      expect(event.args!.hasOwnProperty("myArg")).toBe(true);
      expect(event.args!.myArg).toBe("Some random value");
    });

    fire("myEvent1", { myArg: "Some random value" });
    expect(fired).toBe(true);
  });

  it("stops handling an event after off() is called", () => {
    const { on, off, fire } = evented();
    let fired = false;
    const listener = () => {
      fired = true;
    };

    on("myEvent2", listener);
    fire("myEvent2");
    expect(fired).toBe(true);

    fired = false;
    off("myEvent2", listener);
    fire("myEvent2");
    expect(fired).toBe(false);
  });

  it("stops handling event listeners after off() is called without a listener", () => {
    const { on, off, fire } = evented();
    let fired = false;
    const listener1 = () => {
      fired = true;
    };
    const listener2 = () => {
      fired = true;
    };

    on("myEvent3", listener1);
    on("myEvent3", listener2);
    fire("myEvent3");
    expect(fired).toBe(true);

    fired = false;
    off("myEvent3");
    fire("myEvent3");
    expect(fired).toBe(false);
  });

  it("stops handling an event after the function returned by on() is called", () => {
    const { on, fire } = evented();
    let fired = false;
    const cancel = on("myEvent4", () => {
      fired = true;
    });

    fire("myEvent4");
    expect(fired).toBe(true);

    fired = false;
    cancel();
    fire("myEvent4");
    expect(fired).toBe(false);
  });

  it("returns true for listensTo() for an event that is handled", () => {
    const { on, listensTo } = evented();
    on("myEvent5", () => {
      // Handle event.
    });

    expect(listensTo("myEvent5")).toBe(true);
  });

  it("returns false for listensTo() for an event that is not handled", () => {
    const { listensTo } = evented();
    expect(listensTo("myEvent6")).toBe(false);
  });

  it("returns an array of listeners for a handled event", () => {
    const { on, listeners } = evented();
    const listener1 = () => {
      // Handle event.
    };
    const listener2 = () => {
      // Handle event.
    };

    on("myEvent7", listener1);
    on("myEvent7", listener2);
    expect(listeners("myEvent7")).toEqual([listener1, listener2]);
  });

  it("returns undefined for an event that is not handled", () => {
    const { listeners } = evented();
    expect(listeners("myEvent8")).toBeUndefined();
  });
});
