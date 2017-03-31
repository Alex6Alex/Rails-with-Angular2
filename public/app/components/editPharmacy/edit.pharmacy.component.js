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
var pharmacy_service_1 = require('../../services/pharmacy.service');
var pharmacy_1 = require('../../models/pharmacy');
/// <reference path="ymaps.d.ts"/>
var EditPharmacyComponent = (function () {
    function EditPharmacyComponent(router, pharmacyService, title) {
        this.router = router;
        this.pharmacyService = pharmacyService;
        this.title = title;
        this.pharmacy = new pharmacy_1.Pharmacy(null, null, null, null, null, null);
        this.areas = ['Гагаринский', 'Ленинский', 'Нахимовский', 'Балаклавский'];
        //для решение проблемы с отображением адреса
        this.addressFocus = new core_1.EventEmitter();
        this.addressBlur = new core_1.EventEmitter();
    }
    EditPharmacyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pharmacyService.getPharmacy(this.router.url)
            .subscribe(function (data) {
            _this.pharmacy = data;
        });
        this.ymapsInit();
    };
    EditPharmacyComponent.prototype.editPharmacy = function () {
        var _this = this;
        this.pharmacyService.editPharmacy(this.pharmacy).subscribe(function (data) {
            if (data.status) {
                _this.router.navigateByUrl("/pharmacies/" + data.id);
            }
            else {
                console.log(data.errors);
            }
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    EditPharmacyComponent.prototype.onUpdate = function () {
        this.editPharmacy();
    };
    EditPharmacyComponent.prototype.ymapsInit = function () {
        var _this = this;
        ymaps.ready().then(function () {
            var myMap = new ymaps.Map("mymap", {
                center: [44.578526, 33.532156],
                zoom: 11,
                controls: ['zoomControl', 'fullscreenControl']
            });
            myMap.events.add('click', function (e) {
                var coords = e.get('coords');
                var myGeocoder = ymaps.geocode(coords);
                myGeocoder.then(function (res) {
                    if (res.geoObjects.get(0).properties.get('metaDataProperty')
                        .GeocoderMetaData.kind == 'house') {
                        _this.pharmacy.address = res.geoObjects.get(0)
                            .properties.get('name');
                        _this.addressFocus.emit(true);
                        _this.addressBlur.emit(true);
                    }
                });
            });
        });
    };
    EditPharmacyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'edit.pharmacy',
            templateUrl: 'edit.pharmacy.component.html',
            styleUrls: ['edit.pharmacy.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, pharmacy_service_1.PharmacyService, platform_browser_1.Title])
    ], EditPharmacyComponent);
    return EditPharmacyComponent;
}());
exports.EditPharmacyComponent = EditPharmacyComponent;
//# sourceMappingURL=edit.pharmacy.component.js.map