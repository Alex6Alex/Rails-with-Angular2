"use strict";
var User = (function () {
    function User(name, email, phone, password, password_confirmation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map