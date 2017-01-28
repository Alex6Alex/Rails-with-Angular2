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
var session_service_1 = require('../../services/session.service');
var HomeComponent = (function () {
    function HomeComponent(sessionService) {
        this.sessionService = sessionService;
        this.session = { email: "", password: "" };
        this.sign = false;
        this.user_name = "";
        this.pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        this.errorLog = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.sign_in().subscribe(function (data) {
            if (data.sign) {
                _this.onLogin(true);
                _this.sign = data.sign;
                _this.user_id = data.user.id;
                _this.user_name = data.user.name;
            }
        });
    };
    HomeComponent.prototype.onSubmit = function () {
        this.signIn();
    };
    HomeComponent.prototype.onLogin = function (value) {
        this.sessionService.changes.next(value);
    };
    HomeComponent.prototype.signIn = function () {
        var _this = this;
        this.sessionService.signIn(this.session).subscribe(function (data) {
            _this.sign = true;
            _this.onLogin(true);
            _this.errorLog = false;
            _this.user_id = data.id;
            _this.user_name = data.name;
        }, function (error) {
            _this.errorLog = true;
            console.log(JSON.stringify(error.json()));
        });
    };
    HomeComponent.prototype.logOut = function () {
        var _this = this;
        this.sessionService.logOut(this.user_id).subscribe(function (data) {
            _this.sign = false;
            _this.onLogin(false);
            console.log(data);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.css']
        }), 
        __metadata('design:paramtypes', [session_service_1.SessionService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map