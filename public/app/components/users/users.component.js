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
var router_1 = require('@angular/router');
var home_service_1 = require('../../services/home.service');
var md5_1 = require('ts-md5/dist/md5');
var UsersComponent = (function () {
    function UsersComponent(router, homeService) {
        this.router = router;
        this.homeService = homeService;
        this.gravatars = {};
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.homeService.getUsers().subscribe(function (data) {
            _this.users = data;
            data.forEach(function (d) {
                _this.gravatars[d.name] = md5_1.Md5.hashStr(d.email);
            });
            console.log(_this.gravatars);
        });
    };
    //Удаление пользователя админом
    UsersComponent.prototype.onDestroy = function (user) {
        var _this = this;
        this.homeService.destroyUser(user.id).subscribe(function () {
            _this.users = _this.users.filter(function (u) { return u !== user; });
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'users',
            templateUrl: 'users.component.html',
            styleUrls: ['users.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, home_service_1.HomeService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map