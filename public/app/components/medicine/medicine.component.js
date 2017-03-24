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
var platform_browser_1 = require('@angular/platform-browser');
var medicine_service_1 = require('../../services/medicine.service');
var session_service_1 = require('../../services/session.service');
var atcGroups_1 = require('../../models/atcGroups');
var MedicineComponent = (function () {
    function MedicineComponent(title, router, medicineService, sessionService) {
        this.title = title;
        this.router = router;
        this.medicineService = medicineService;
        this.sessionService = sessionService;
        this.medicine = new atcGroups_1.Medicine(null, null, null, null, null, null);
        this.price = null;
        this.count = null;
        //параметры сортировки
        this.showSortList = false;
        this.sortBy = 'name';
        this.sortTitle = 'по названию';
        //параметры режима работы
        this.showWorkTimes = false;
        this.workTime = 'all';
        this.workTitle = 'все';
    }
    MedicineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getMedicine();
        this.sessionService.isAdmin.subscribe(function (status) {
            _this.canChange = status;
        });
    };
    MedicineComponent.prototype.getMedicine = function () {
        var _this = this;
        this.medicineService.getMedicine(this.router.url)
            .subscribe(function (data) {
            _this.medicine = data.medicine;
            _this.medicine.pack = data.medicine.package;
            _this.prices = data.prices;
            //setTitle(this.group.description);
        });
    };
    //сортировка
    MedicineComponent.prototype.onSort = function (sortBy) {
        if (this.sortBy === sortBy)
            return;
        this.sortBy = sortBy;
        this.setOrder(this.sortBy, this.workTime);
        if (this.sortBy === 'name')
            this.sortTitle = 'по названию';
        else if (this.sortBy === 'address')
            this.sortTitle = 'по адресу';
        else
            this.sortTitle = 'по цене';
        this.showSortList = false;
    };
    //выбор времени работы
    MedicineComponent.prototype.onWorktimeChange = function (time) {
        if (this.workTime == time)
            return;
        this.workTime = time;
        this.setOrder(this.sortBy, this.workTime);
        if (this.workTime === 'all')
            this.workTitle = 'все';
        else if (this.workTime === 'day')
            this.workTitle = 'дневные';
        else
            this.workTitle = 'круглосуточные';
        this.showWorkTimes = false;
    };
    MedicineComponent.prototype.setOrder = function (order, time) {
        var _this = this;
        this.medicineService.setOrder(order, time, this.medicine.id)
            .subscribe(function (data) {
            _this.prices = data;
        });
    };
    MedicineComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'medicine',
            templateUrl: 'medicine.component.html',
            styleUrls: ['medicine.css']
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router, medicine_service_1.MedicineService, session_service_1.SessionService])
    ], MedicineComponent);
    return MedicineComponent;
}());
exports.MedicineComponent = MedicineComponent;
//# sourceMappingURL=medicine.component.js.map