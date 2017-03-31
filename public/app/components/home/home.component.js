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
var app_component_1 = require('../../app.component');
var md5_1 = require('ts-md5/dist/md5');
var HomeComponent = (function () {
    function HomeComponent(sessionService, appComponent) {
        this.sessionService = sessionService;
        this.appComponent = appComponent;
        //модель для входа
        this.session = { email: null, password: null };
        //атрибуты пользователя
        this.user = { id: null, name: null, gravatar: null };
        //эл. почта
        this.pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        //указать ошибки, если они есть
        this.errorLog = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.isSignIn().subscribe(function (data) {
            if (data.sign) {
                _this.sign = data.sign;
                _this.user.id = data.user.id;
                _this.user.name = data.user.name;
                _this.user.gravatar = md5_1.Md5.hashStr(data.user.email);
                _this.admin = data.user.admin;
                _this.signInState(true);
                _this.isAdmin(_this.admin);
                _this.signState();
            }
            else {
                _this.signState();
            }
        });
    };
    HomeComponent.prototype.onSubmit = function () {
        this.signIn();
    };
    HomeComponent.prototype.signInState = function (value) {
        this.sessionService.signInState.next(value);
    };
    //определение админа
    HomeComponent.prototype.isAdmin = function (value) {
        this.sessionService.isAdmin.next(value);
    };
    //если вышел
    HomeComponent.prototype.signState = function () {
        var _this = this;
        this.sessionService.signInState.subscribe(function (status) {
            _this.sign = status;
        });
        this.sessionService.isAdmin.subscribe(function (admin) {
            _this.admin = admin;
        });
    };
    //вход
    HomeComponent.prototype.signIn = function () {
        var _this = this;
        this.sessionService.signIn(this.session).subscribe(function (data) {
            _this.sign = true;
            console.log(data);
            _this.errorLog = false;
            _this.user.id = data.id;
            _this.user.name = data.name;
            _this.user.gravatar = md5_1.Md5.hashStr(data.email);
            _this.appComponent.user = _this.user;
            _this.admin = data.admin;
            _this.signInState(true);
            _this.isAdmin(_this.admin);
        }, function (error) {
            _this.errorLog = true;
        });
    };
    //выход
    HomeComponent.prototype.logOut = function () {
        var _this = this;
        this.sessionService.logOut(this.user.id).subscribe(function (data) {
            _this.sign = false;
            _this.admin = false;
            _this.signInState(false);
            _this.isAdmin(false);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.css']
        }), 
        __metadata('design:paramtypes', [session_service_1.SessionService, app_component_1.AppComponent])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map