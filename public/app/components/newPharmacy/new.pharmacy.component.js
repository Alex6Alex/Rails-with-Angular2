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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var FocusDirective = (function () {
    function FocusDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.focusEvent = new core_1.EventEmitter();
    }
    FocusDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.focusEvent.subscribe(function (event) {
            _this.renderer.invokeElementMethod(_this.element.nativeElement, 'focus', []);
        });
    };
    __decorate([
        core_1.Input('focus'), 
        __metadata('design:type', core_1.EventEmitter)
    ], FocusDirective.prototype, "focusEvent", void 0);
    FocusDirective = __decorate([
        core_1.Directive({
            selector: '[focus]'
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], FocusDirective);
    return FocusDirective;
}());
exports.FocusDirective = FocusDirective;
var BlurDirective = (function () {
    function BlurDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.blurEvent = new core_1.EventEmitter();
    }
    BlurDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.blurEvent.subscribe(function (event) {
            _this.renderer.invokeElementMethod(_this.element.nativeElement, 'blur', []);
        });
    };
    __decorate([
        core_1.Input('blur'), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlurDirective.prototype, "blurEvent", void 0);
    BlurDirective = __decorate([
        core_1.Directive({
            selector: '[blur]'
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], BlurDirective);
    return BlurDirective;
}());
exports.BlurDirective = BlurDirective;
var NewPharmacyComponent = (function () {
    function NewPharmacyComponent(router, pharmacyService, title) {
        this.router = router;
        this.pharmacyService = pharmacyService;
        this.title = title;
        this.pharmacy = new pharmacy_1.Pharmacy(null, null, null, null, null, null);
        this.areas = ['Гагаринский', 'Ленинский', 'Нахимовский', 'Балаклавский'];
        //для решение проблемы с отображением адреса
        this.addressFocus = new core_1.EventEmitter();
        this.addressBlur = new core_1.EventEmitter();
    }
    NewPharmacyComponent.prototype.ngOnInit = function () {
        this.ymapsInit();
    };
    NewPharmacyComponent.prototype.newPharmacy = function () {
        var _this = this;
        this.pharmacyService.newPharmacy(this.pharmacy).subscribe(function (data) {
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
    NewPharmacyComponent.prototype.onSubmit = function () {
        this.newPharmacy();
    };
    NewPharmacyComponent.prototype.ymapsInit = function () {
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
    NewPharmacyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'new.pharmacy',
            templateUrl: 'new.pharmacy.component.html',
            styleUrls: ['new.pharmacy.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, pharmacy_service_1.PharmacyService, platform_browser_1.Title])
    ], NewPharmacyComponent);
    return NewPharmacyComponent;
}());
exports.NewPharmacyComponent = NewPharmacyComponent;
//# sourceMappingURL=new.pharmacy.component.js.map