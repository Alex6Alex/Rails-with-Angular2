"use strict";
var User = (function () {
    function User(name, email, password, password_confirm) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirm = password_confirm;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map