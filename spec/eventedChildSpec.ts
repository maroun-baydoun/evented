
import {Event, Evented} from "../evented";

class User extends Evented {
  loggedIn: boolean;

  logIn = () => {
    this.loggedIn = true;
    this.fire("loggedIn", {time: Util.getNow()});
  }
}

class Util {
  static getNow = (): Date =>  {
    return new Date();
  }
}

describe("User", () => {

  let user: User;
  let now: Date;

  beforeEach(() => {
    user = new User();
    now = new Date();
    spyOn(Util, "getNow").and.returnValue(now);
  });

  it("handles a fired event with on()", () => {
    let fired = false;
    user.on("loggedIn", (e: Event) => {
      fired = true;
      expect(e.args.hasOwnProperty("time")).toBe(true);
      expect(e.args.time).toBe(now);
    });
    user.logIn();
    expect(fired).toBe(true);
  });

  it("stops handling an event after off() is called", () => {
    let fired = false;
    let lisener = () => {fired = true; };
    user.on("loggedIn", lisener);
    user.logIn();
    expect(fired).toBe(true);

    fired = false;
    user.off("loggedIn", lisener);
    user.logIn();
    expect(fired).toBe(false);
  });

  it("stops handling an event after the function returned by on() is called", () => {
    let fired = false;
    let cancel = user.on("loggedIn", () => {fired = true; });
    user.logIn();
    expect(fired).toBe(true);

    fired = false;
    cancel();
    user.logIn();
    expect(fired).toBe(false);
  });

  it("returns true for listensTo() for an event that is handled", () => {
    user.on("loggedIn", () => { /*Handle event*/});
    expect(user.listensTo("loggedIn")).toBe(true);
  });

  it("returns false for listensTo() for an event that is not handled", () => {
    expect(user.listensTo("loggedOut")).toBe(false);
  });
});
