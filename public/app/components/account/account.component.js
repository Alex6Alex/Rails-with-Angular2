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
var price_service_1 = require('../../services/price.service');
var user_1 = require('../../models/user');
var app_component_1 = require('../../app.component');
var md5_1 = require('ts-md5/dist/md5');
var AccountComponent = (function () {
    function AccountComponent(router, homeService, priceService, appComponent) {
        this.router = router;
        this.homeService = homeService;
        this.priceService = priceService;
        this.appComponent = appComponent;
        this.user = new user_1.User(null, null, null, null, null, null, null);
        this.reservations = [];
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.getUserInfo();
    };
    AccountComponent.prototype.getUserInfo = function () {
        var _this = this;
        this.homeService.getUserData(this.router.url).subscribe(function (data) {
            _this.user = data;
            _this.gravatar = md5_1.Md5.hashStr(data.email);
            _this.appComponent.user.id = _this.user.id;
            _this.appComponent.user.name = _this.user.name;
            _this.appComponent.user.gravatar = _this.gravatar;
            _this.getReservations();
        });
    };
    AccountComponent.prototype.getReservations = function () {
        var _this = this;
        this.priceService.getReservations(this.user.id).subscribe(function (data) {
            _this.reservations = data;
            console.log(data);
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'account',
            templateUrl: 'account.component.html',
            styleUrls: ['account.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, home_service_1.HomeService, price_service_1.PriceService, app_component_1.AppComponent])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map