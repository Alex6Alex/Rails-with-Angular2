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
var pharmacy_service_1 = require('../../services/pharmacy.service');
/// <reference path="ymaps.d.ts"/>
var PharmaciesComponent = (function () {
    function PharmaciesComponent(pharmacyService) {
        this.pharmacyService = pharmacyService;
        //change class for selected area
        this.area = 0;
        this.pharms = [];
    }
    PharmaciesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPharms();
        ymaps.ready().then(function () {
            _this.myMap = new ymaps.Map("mymap", {
                center: [44.578526, 33.532156],
                zoom: 11,
                controls: ['zoomControl', 'fullscreenControl']
            });
            var HintLayout = ymaps.templateLayoutFactory.createClass("<div class='my-hint'>" +
                "<b>{{ properties.title }}</b><br/> {{ properties.address }}" +
                "</div>", {
                getShape: function () {
                    var el = this.getElement(), result = null;
                    if (el) {
                        var firstChild = el.firstChild;
                        result = new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                            [0, 0],
                            [firstChild.offsetWidth, firstChild.offsetHeight]
                        ]));
                    }
                    return result;
                }
            });
            var _loop_1 = function(pharm) {
                var myGeocoder = ymaps.geocode("\u0421\u0435\u0432\u0430\u0441\u0442\u043E\u043F\u043E\u043B\u044C, " + pharm.address);
                myGeocoder.then(function (res) {
                    var myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
                        title: pharm.name,
                        address: pharm.address
                    }, {
                        hintLayout: HintLayout,
                        preset: 'islands#darkGreenMedicalIcon'
                    });
                    _this.myMap.geoObjects.add(myPlacemark);
                });
            };
            for (var _i = 0, _a = _this.pharms; _i < _a.length; _i++) {
                var pharm = _a[_i];
                _loop_1(pharm);
            }
        });
    };
    PharmaciesComponent.prototype.getPharms = function () {
        var _this = this;
        this.pharmacyService.getPharms().subscribe(function (data) {
            _this.pharms = data;
        });
    };
    PharmaciesComponent.prototype.setArea = function (num) {
        switch (num) {
            case 0: {
                this.area = 0;
                this.myMap.setCenter([44.578526, 33.532156]);
                this.myMap.setZoom(11);
                break;
            }
            case 1: {
                this.area = 1;
                this.myMap.setCenter([44.568588, 33.452416]);
                this.myMap.setZoom(13);
                break;
            }
            case 2: {
                this.area = 2;
                this.myMap.setCenter([44.584961, 33.524793]);
                this.myMap.setZoom(13);
                break;
            }
            case 3: {
                this.area = 3;
                this.myMap.setCenter([44.615463, 33.568546]);
                this.myMap.setZoom(13);
                break;
            }
            case 4: {
                this.area = 4;
                this.myMap.setCenter([44.528813, 33.594336]);
                this.myMap.setZoom(13);
                break;
            }
        }
    };
    PharmaciesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pharmacies',
            templateUrl: 'pharmacies.component.html',
            styleUrls: ['pharmacies.css']
        }), 
        __metadata('design:paramtypes', [pharmacy_service_1.PharmacyService])
    ], PharmaciesComponent);
    return PharmaciesComponent;
}());
exports.PharmaciesComponent = PharmaciesComponent;
//# sourceMappingURL=pharmacies.component.js.map