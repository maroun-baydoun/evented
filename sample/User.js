var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Evented"], function (require, exports, Evented_1) {
    var User = (function (_super) {
        __extends(User, _super);
        function User(userName) {
            _super.call(this);
            this._userName = userName;
        }
        Object.defineProperty(User.prototype, "userName", {
            get: function () {
                return this._userName;
            },
            enumerable: true,
            configurable: true
        });
        User.prototype.login = function (password) {
            if (password === "password") {
                var loginDate = new Date();
                this.fire("loggedIn", { "loginDate": loginDate });
                return true;
            }
            this.fire("invalidLogin");
            return true;
        };
        return User;
    })(Evented_1.Evented);
    return User;
});
