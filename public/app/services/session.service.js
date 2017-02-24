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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var SessionService = (function () {
    function SessionService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
        //for update header wher user sign in
        this.signInState = new BehaviorSubject_1.BehaviorSubject(false);
    }
    //registrate new user
    SessionService.prototype.newUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
            password_confirmation: user.password_confirmation
        });
        return this.http.post('/users.json', body, options)
            .map(function (res) { return res.json(); });
    };
    //sign in function for registrated user
    SessionService.prototype.signIn = function (sessionData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(sessionData);
        return this.http.post('/sessions.json', body, options).map(function (res) { return res.json(); });
    };
    //exit from service
    SessionService.prototype.logOut = function (id) {
        return this.http.delete('/sessions/' + id + '.json').map(function (res) { return res.json(); });
    };
    SessionService.prototype.isSignIn = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "";
        return this.http.post('/signstate.json', body, options).map(function (res) { return res.json(); });
    };
    SessionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map