import evented from "../src/evented";

const { on, off, fire, listensTo, listeners } = evented();

describe("Evented", () => {
  it("handles a fired event with on()", () => {
    let fired = false;
    on<{ myArg: string }>("myEvent1", (e) => {
      fired = true;
      expect(e.args).toBeDefined();
      expect(e.args!.hasOwnProperty("myArg")).toBe(true);
      expect(e.args!.myArg).toBe("Some random value");
    });
    fire("myEvent1", { myArg: "Some random value" });
    expect(fired).toBe(true);
  });

  it("stops handling an event after off() is called", () => {
    let fired = false;
    let listener = () => {
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
    let fired = false;
    let listener1 = () => {
      fired = true;
    };
    let listener2 = () => {
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
    let fired = false;
    let cancel = on("myEvent4", () => {
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
    on("myEvent5", () => {
      /*Handle event*/
    });
    expect(listensTo("myEvent5")).toBe(true);
  });

  it("returns false for listensTo() for an event that is not handled", () => {
    expect(listensTo("myEvent6")).toBe(false);
  });

  it("returns an array of listeners for a handled event", () => {
    let listener1 = () => {
      /*Handle event*/
    };
    let listener2 = () => {
      /*Handle event*/
    };
    on("myEvent7", listener1);
    on("myEvent7", listener2);
    expect(listeners("myEvent7")).toEqual([listener1, listener2]);
  });

  it("returns undefined for a an event that is not handled", () => {
    expect(listeners("myEvent8")).toBeUndefined();
  });
});
