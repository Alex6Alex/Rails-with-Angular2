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
var AccountComponent = (function () {
    function AccountComponent(router, homeService) {
        this.router = router;
        this.homeService = homeService;
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.getUserInfo();
    };
    AccountComponent.prototype.getUserInfo = function () {
        var _this = this;
        this.homeService.getData(this.router.url).subscribe(function (data) {
            _this.name = data.name;
            _this.email = data.email;
            _this.created_at = data.created_at;
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'account',
            templateUrl: 'account.component.html',
            styleUrls: ['account.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, home_service_1.HomeService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map