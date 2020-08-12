import { Evented } from "../src/evented";

describe("Evented", () => {
  it("handles a fired event with on()", () => {
    let fired = false;
    Evented.on<{ myArg: string }>("myEvent1", (e) => {
      fired = true;
      expect(e.args).toBeDefined();
      expect(e.args!.hasOwnProperty("myArg")).toBe(true);
      expect(e.args!.myArg).toBe("Some random value");
    });
    Evented.fire("myEvent1", { myArg: "Some random value" });
    expect(fired).toBe(true);
  });

  it("stops handling an event after off() is called", () => {
    let fired = false;
    let lisener = () => {
      fired = true;
    };
    Evented.on("myEvent2", lisener);
    Evented.fire("myEvent2");
    expect(fired).toBe(true);

    fired = false;
    Evented.off("myEvent2", lisener);
    Evented.fire("myEvent2");
    expect(fired).toBe(false);
  });

  it("stops handling event listeners after off() is called without a listener", () => {
    let fired = false;
    let lisener1 = () => {
      fired = true;
    };
    let lisener2 = () => {
      fired = true;
    };
    Evented.on("myEvent3", lisener1);
    Evented.on("myEvent3", lisener2);
    Evented.fire("myEvent3");
    expect(fired).toBe(true);

    fired = false;
    Evented.off("myEvent3");
    Evented.fire("myEvent3");
    expect(fired).toBe(false);
  });

  it("stops handling an event after the function returned by on() is called", () => {
    let fired = false;
    let cancel = Evented.on("myEvent4", () => {
      fired = true;
    });
    Evented.fire("myEvent4");
    expect(fired).toBe(true);

    fired = false;
    cancel();
    Evented.fire("myEvent4");
    expect(fired).toBe(false);
  });

  it("returns true for listensTo() for an event that is handled", () => {
    Evented.on("myEvent5", () => {
      /*Handle event*/
    });
    expect(Evented.listensTo("myEvent5")).toBe(true);
  });

  it("returns false for listensTo() for an event that is not handled", () => {
    expect(Evented.listensTo("myEvent6")).toBe(false);
  });

  it("returns an array of listeners for a handled event", () => {
    let listener1 = () => {
      /*Handle event*/
    };
    let listener2 = () => {
      /*Handle event*/
    };
    Evented.on("myEvent7", listener1);
    Evented.on("myEvent7", listener2);
    expect(Evented.listeners("myEvent7")).toEqual([listener1, listener2]);
  });

  it("returns undefined for a an event that is not handled", () => {
    expect(Evented.listeners("myEvent8")).toBeUndefined();
  });
});