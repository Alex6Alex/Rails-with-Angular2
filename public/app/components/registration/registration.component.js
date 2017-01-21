"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_1 = require('../../models/user');
var session_service_1 = require('../../services/session.service');
var RegistrationComponent = (function () {
    function RegistrationComponent(sessionService) {
        this.sessionService = sessionService;
        this.model = new user_1.User("", "", "", "");
        this.email_valid = false;
        this.pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    }
    RegistrationComponent.prototype.newUser = function () {
        this.sessionService.newUser(this.model).subscribe(function (data) {
            alert(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    RegistrationComponent.prototype.onSubmit = function () {
        this.newUser();
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'registration',
            templateUrl: 'registration.component.html',
            styleUrls: ['registration.css']
        }), 
        __metadata('design:paramtypes', [session_service_1.SessionService])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map