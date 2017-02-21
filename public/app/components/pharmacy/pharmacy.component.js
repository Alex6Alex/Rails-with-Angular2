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
var pharmacy_service_1 = require('../../services/pharmacy.service');
var pharmacy_1 = require('../../models/pharmacy');
/// <reference path="ymaps.d.ts"/>
var PharmacyComponent = (function () {
    function PharmacyComponent(router, pharmacyService) {
        this.router = router;
        this.pharmacyService = pharmacyService;
        this.pharmacy = new pharmacy_1.Pharmacy(null, null, null, null, null);
    }
    PharmacyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pharmacyService.getPharmacy(this.router.url)
            .subscribe(function (data) {
            _this.pharmacy = data;
            _this.ymapsInit(data.address);
        });
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
        __metadata('design:paramtypes', [router_1.Router, pharmacy_service_1.PharmacyService])
    ], PharmacyComponent);
    return PharmacyComponent;
}());
exports.PharmacyComponent = PharmacyComponent;
//# sourceMappingURL=pharmacy.component.js.map