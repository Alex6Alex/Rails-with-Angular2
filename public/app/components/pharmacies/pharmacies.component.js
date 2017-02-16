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
require('rxjs/add/operator/toPromise');
var pharmacy_service_1 = require('../../services/pharmacy.service');
/// <reference path="ymaps.d.ts"/>
var PharmaciesComponent = (function () {
    function PharmaciesComponent(pharmacyService) {
        this.pharmacyService = pharmacyService;
        this.pharms = [];
        //параметры выбора района
        this.area = 0;
        this.areaName = 'Все';
        //параметры сортировки
        this.showSortList = false;
        this.sortBy = 'name';
        this.sortTitle = 'по названию';
        //параметры режима работы
        this.showWorkTimes = false;
        this.workTime = 'all';
        this.workTitle = 'все';
    }
    PharmaciesComponent.prototype.ngOnInit = function () {
        this.ymapsInit();
        this.getPharms();
    };
    PharmaciesComponent.prototype.getPharms = function () {
        var _this = this;
        this.pharmacyService.getPharms().then(function (data) {
            _this.pharms = data;
            _this.pharmsToMap();
        });
        return Promise.resolve(0);
    };
    PharmaciesComponent.prototype.ymapsInit = function () {
        var _this = this;
        ymaps.ready().then(function () {
            _this.myMap = new ymaps.Map("mymap", {
                center: [44.578526, 33.532156],
                zoom: 11,
                controls: ['zoomControl', 'fullscreenControl']
            });
            _this.HintLayout = ymaps.templateLayoutFactory.createClass("<div class='my-hint'>" +
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
        });
    };
    //сортировка
    PharmaciesComponent.prototype.onSort = function (sortBy) {
        if (this.sortBy === sortBy)
            return;
        this.sortBy = sortBy;
        this.getArea(this.areaName, sortBy, this.workTime, false);
        if (this.sortBy === 'name')
            this.sortTitle = 'по названию';
        else
            this.sortTitle = 'по адресу';
        this.showSortList = false;
    };
    //выбор времени работы
    PharmaciesComponent.prototype.onWorktimeChange = function (time) {
        if (this.workTime == time)
            return;
        this.workTime = time;
        this.getArea(this.areaName, this.sortBy, this.workTime, true);
        if (this.workTime === 'all')
            this.workTitle = 'все';
        else if (this.workTime === 'day')
            this.workTitle = 'дневные';
        else
            this.workTitle = 'круглосуточные';
        this.showWorkTimes = false;
    };
    //выбор района
    PharmaciesComponent.prototype.setArea = function (num, area) {
        if (this.areaName == area)
            return;
        this.areaName = area;
        this.area = num;
        this.getArea(this.areaName, this.sortBy, this.workTime, true);
        switch (num) {
            case 0: {
                this.myMap.setCenter([44.578526, 33.532156]);
                this.myMap.setZoom(11);
                break;
            }
            case 1: {
                this.myMap.setCenter([44.568588, 33.452416]);
                this.myMap.setZoom(13);
                break;
            }
            case 2: {
                this.myMap.setCenter([44.584961, 33.524793]);
                this.myMap.setZoom(13);
                break;
            }
            case 3: {
                this.myMap.setCenter([44.615463, 33.568546]);
                this.myMap.setZoom(13);
                break;
            }
            case 4: {
                this.myMap.setCenter([44.528813, 33.594336]);
                this.myMap.setZoom(13);
                break;
            }
        }
    };
    //запрос о районе на сервер
    PharmaciesComponent.prototype.getArea = function (area, sortBy, workTime, refresh) {
        var _this = this;
        this.pharmacyService.getArea(area, sortBy, workTime)
            .then(function (data) {
            _this.pharms = data;
            if (refresh) {
                _this.myMap.geoObjects.removeAll();
                _this.pharmsToMap();
            }
        });
    };
    //отобразить аптеки на карте
    PharmaciesComponent.prototype.pharmsToMap = function () {
        var _this = this;
        ymaps.ready().then(function () {
            var _loop_1 = function(pharm) {
                var myGeocoder = ymaps.geocode("\u0421\u0435\u0432\u0430\u0441\u0442\u043E\u043F\u043E\u043B\u044C, " + pharm.address);
                myGeocoder.then(function (res) {
                    var myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
                        title: pharm.name,
                        address: pharm.address
                    }, {
                        hintLayout: _this.HintLayout,
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