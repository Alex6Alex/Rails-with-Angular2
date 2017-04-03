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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
    }
    HomeService.prototype.getData = function (path) {
        return this.http.get(path + '.json')
            .map(function (res) { return res.json(); });
    };
    HomeService.prototype.getUsers = function () {
        return this.http.get('users.json')
            .map(function (res) { return res.json(); });
    };
    HomeService.prototype.getUserData = function (path) {
        return this.http.get(path + ".json")
            .map(function (res) { return res.json(); });
    };
    HomeService.prototype.getDates = function () {
        return this.http.get('/dates.json').map(function (res) { return res.json(); });
    };
    HomeService.prototype.updateUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
            password_confirmation: user.password_confirmation
        });
        return this.http.put("/users/" + user.id + ".json", body, options)
            .map(function (res) { return res.json(); });
    };
    HomeService.prototype.destroyUser = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete("/users/" + id + ".json", options)
            .map(function () { return null; });
    };
    HomeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomeService);
    return HomeService;
}());
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map