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
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/map');
var Subject_1 = require('rxjs/Subject');
var pharmacy_service_1 = require('../../services/pharmacy.service');
var pharmacy_1 = require('../../models/pharmacy');
/// <reference path="ymaps.d.ts"/>
var PharmacyComponent = (function () {
    function PharmacyComponent(router, pharmacyService, title) {
        this.router = router;
        this.pharmacyService = pharmacyService;
        this.title = title;
        this.showItems = false;
        this.resultsIsShow = false;
        this.searchTerm = null;
        this.pharmacy = new pharmacy_1.Pharmacy(null, null, null, null, null, null);
        //поиск аптек
        this.searchStream = new Subject_1.Subject();
    }
    PharmacyComponent.prototype.searchPharm = function (term) {
        this.searchStream.next(term);
    };
    //скрывать результаты поиска, если кликнули на др. объект
    PharmacyComponent.prototype.onShowSearchRes = function (value) {
        if (this.resultsIsShow) {
            return;
        }
        ;
        this.showItems = value;
    };
    //результат поиска
    PharmacyComponent.prototype.onSubmit = function (value) {
        if (this.searchTerm === value)
            return;
        this.searchTerm = value;
        //this.getArea(this.searchTerm, this.areaName, 
        //			this.sortBy, this.workTime, true);	
    };
    PharmacyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pharmacyService.getPharmacy(this.router.url)
            .subscribe(function (data) {
            _this.pharmacy = data;
            //this.title.setTitle(this.pharmacy.name);
            _this.ymapsInit(data.address);
        });
        this.searchStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) {
            return _this.pharmacyService.searchByPharmacy(term, _this.pharmacy.id);
        })
            .subscribe(function (res) { _this.items = res; });
    };
    PharmacyComponent.prototype.ymapsInit = function (address) {
        var _this = this;
        ymaps.ready().then(function () {
            var myGeocoder = ymaps.geocode("\u0421\u0435\u0432\u0430\u0441\u0442\u043E\u043F\u043E\u043B\u044C, " + address);
            myGeocoder.then(function (res) {
                var lat = res.geoObjects.get(0).geometry.getCoordinates()[0];
                var lng = res.geoObjects.get(0).geometry.getCoordinates()[1];
                var myMap = new ymaps.Map("mymap", {
                    center: [lat, lng],
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl']
                });
                var myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
                    iconContent: _this.pharmacy.name + " (" + _this.pharmacy.address + ")"
                }, {
                    preset: "islands#darkGreenStretchyIcon"
                });
                myMap.geoObjects.add(myPlacemark);
            });
        });
    };
    PharmacyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pharmacy',
            templateUrl: 'pharmacy.component.html',
            styleUrls: ['pharmacy.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, pharmacy_service_1.PharmacyService, platform_browser_1.Title])
    ], PharmacyComponent);
    return PharmacyComponent;
}());
exports.PharmacyComponent = PharmacyComponent;
//# sourceMappingURL=pharmacy.component.js.map