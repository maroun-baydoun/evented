 import Evented = require("Evented");

 class User extends Evented {

  private _userName: string;

  constructor(userName: string) {
    super();

    this._userName = userName;
  }

  get userName(): string {
    return this._userName;
  }

  public login(password: string) {

      if (password === "password") {

        var loginDate: Date = new Date();

        this.fire("loggedIn", {"loginDate": loginDate});

        return true;
      }

      this.fire("invalidLogin");

      return true;
  }
}

export = User;
