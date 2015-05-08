define(["require", "exports", "User"], function (require, exports, User) {
    var loginButton = document.getElementById("loginButton"), passwordField = document.getElementById("passwordField"), notice = document.getElementById("notice"), user = new User("maroun"), password, loginAttemps = 0;
    loginButton.addEventListener("click", function () {
        notice.style.display = "none";
        notice.classList.remove("alert-danger");
        notice.classList.remove("alert-success");
        password = passwordField.value;
        user.login(password);
    });
    user.on("loggedIn", function (e) {
        notice.classList.add("alert-success");
        notice.innerText = "Login successful";
        notice.style.display = "block";
        passwordField.disabled = true;
        loginButton.disabled = true;
        loginAttemps = 0;
    });
    user.on("invalidLogin", function (e) {
        notice.classList.add("alert-danger");
        notice.innerText = "Try again! (Hint:The correct password is 'password')";
        notice.style.display = "block";
        loginAttemps++;
        if (loginAttemps === 3) {
            user.fire("accountLocked", { "reason": "repeated failed login attempts" });
        }
    });
    user.on("accountLocked", function (e) {
        notice.classList.add("alert-danger");
        notice.innerText = "Your account is locked due to " + e.args.reason + ".";
        notice.style.display = "block";
        passwordField.disabled = true;
        loginButton.disabled = true;
    });
});
