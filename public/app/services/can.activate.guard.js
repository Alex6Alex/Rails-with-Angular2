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
require('rxjs/add/observable/of');
require('rxjs/Rx');
var session_service_1 = require('./session.service');
var CanActivateGuard = (function () {
    function CanActivateGuard(sessionService) {
        this.sessionService = sessionService;
    }
    CanActivateGuard.prototype.canActivate = function (route, state) {
        var admin;
        this.sessionService._isAdmin.then(function (data) {
            admin = data;
        });
        return admin;
        //console.log('ffff');
        //return true;
    };
    CanActivateGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [session_service_1.SessionService])
    ], CanActivateGuard);
    return CanActivateGuard;
}());
exports.CanActivateGuard = CanActivateGuard;
//# sourceMappingURL=can.activate.guard.js.map