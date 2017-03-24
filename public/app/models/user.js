"use strict";
var User = (function () {
    function User(id, name, email, phone, password, password_confirmation, admin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.admin = admin;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map