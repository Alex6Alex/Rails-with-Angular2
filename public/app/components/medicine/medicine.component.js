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
var pharmacy_service_1 = require('../../services/pharmacy.service');
var price_service_1 = require('../../services/price.service');
var atcGroups_1 = require('../../models/atcGroups');
var price_1 = require('../../models/price');
var MedicineComponent = (function () {
    function MedicineComponent(title, router, medicineService, sessionService, pharmacyService, priceService) {
        this.title = title;
        this.router = router;
        this.medicineService = medicineService;
        this.sessionService = sessionService;
        this.pharmacyService = pharmacyService;
        this.priceService = priceService;
        this.medicine = new atcGroups_1.Medicine(null, null, null, null, null, null);
        this.prices = [];
        this.price = null;
        this.count = null;
        this.newPrice = new price_1.Price(null, null, null, null, null);
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
        this.sessionService.signInState.subscribe(function (status) {
            _this.canBuy = status;
        });
        this.sessionService.isAdmin.subscribe(function (status) {
            _this.canChange = status;
            if (_this.canChange == true) {
                _this.pharmacyService.getPharms().then(function (data) {
                    _this.pharmacies = data;
                });
            }
        });
    };
    MedicineComponent.prototype.createPrice = function () {
        var _this = this;
        this.newPrice.medicine_id = this.medicine.id;
        this.priceService.newPrice(this.newPrice).subscribe(function (data) {
            if (data.status) {
                //this.router.navigateByUrl(`/medicines/${data.id}`);
                _this.getMedicine();
                _this.onRefresh();
            }
            else {
                console.log(data.errors);
            }
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    MedicineComponent.prototype.onSubmit = function () {
        this.createPrice();
    };
    MedicineComponent.prototype.onReserve = function (price) {
        var _this = this;
        this.priceService.reservePrice(this.user_id, price.id).subscribe(function () {
            for (var _i = 0, _a = _this.prices; _i < _a.length; _i++) {
                var _price = _a[_i];
                if (_price === price) {
                    _price.count--;
                    break;
                }
            }
        });
    };
    //Удаление
    MedicineComponent.prototype.onDestroy = function (price) {
        var _this = this;
        this.priceService.destroyPrice(price.id).subscribe(function () {
            _this.prices = _this.prices.filter(function (p) { return p !== price; });
        });
    };
    MedicineComponent.prototype.onRefresh = function () {
        this.newPrice = new price_1.Price(null, null, null, null, null);
    };
    MedicineComponent.prototype.getMedicine = function () {
        var _this = this;
        this.medicineService.getMedicine(this.router.url)
            .subscribe(function (data) {
            _this.medicine = data.medicine;
            _this.medicine.pack = data.medicine.package;
            _this.prices = data.prices;
            _this.user_id = data.id;
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
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router, medicine_service_1.MedicineService, session_service_1.SessionService, pharmacy_service_1.PharmacyService, price_service_1.PriceService])
    ], MedicineComponent);
    return MedicineComponent;
}());
exports.MedicineComponent = MedicineComponent;
//# sourceMappingURL=medicine.component.js.map