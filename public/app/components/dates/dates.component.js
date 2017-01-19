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
var home_service_1 = require('../../services/home.service');
var DatesComponent = (function () {
    function DatesComponent(homeService) {
        this.homeService = homeService;
        this.today = new Date();
        this.a = 1;
        this.days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    }
    DatesComponent.prototype.getDates = function () {
        this.homeService.getDates().subscribe(function (data) {
        });
    };
    DatesComponent.prototype.ngOnInit = function () {
        this.getDates();
    };
    DatesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dates',
            templateUrl: 'dates.component.html'
        }), 
        __metadata('design:paramtypes', [home_service_1.HomeService])
    ], DatesComponent);
    return DatesComponent;
}());
exports.DatesComponent = DatesComponent;
//# sourceMappingURL=dates.component.js.map