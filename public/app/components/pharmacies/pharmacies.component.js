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
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/map');
var Subject_1 = require('rxjs/Subject');
var pharmacy_service_1 = require('../../services/pharmacy.service');
var session_service_1 = require('../../services/session.service');
/// <reference path="ymaps.d.ts"/>
var PharmaciesComponent = (function () {
    function PharmaciesComponent(pharmacyService, sessionService) {
        this.pharmacyService = pharmacyService;
        this.sessionService = sessionService;
        this.showItems = false;
        this.resultsIsShow = false;
        this.searchTerm = null;
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
        //поиск аптек
        this.searchStream = new Subject_1.Subject();
    }
    PharmaciesComponent.prototype.searchPharm = function (term) {
        //this.items = this.pharmacyService.search(term);
        this.searchStream.next(term);
    };
    //скрывать результаты поиска, если кликнули на др. объект
    PharmaciesComponent.prototype.onShowSearchRes = function (value) {
        if (this.resultsIsShow) {
            return;
        }
        ;
        this.showItems = value;
    };
    //результат поиска
    PharmaciesComponent.prototype.onSubmit = function (value) {
        if (this.searchTerm === value)
            return;
        this.searchTerm = value;
        this.getArea(this.searchTerm, this.areaName, this.sortBy, this.workTime);
    };
    PharmaciesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPharms();
        this.sessionService.isAdmin.subscribe(function (status) {
            _this.canDestroy = status;
        });
        this.ymapsInit();
        this.searchStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) {
            return _this.pharmacyService.search(term);
        })
            .subscribe(function (res) { _this.items = res; });
    };
    PharmaciesComponent.prototype.getPharms = function () {
        var _this = this;
        this.pharmacyService.getPharms().then(function (data) {
            _this.pharms = data;
            _this.pharmsToMap();
        });
        return Promise.resolve(0);
    };
    //Удаление аптеки админом
    PharmaciesComponent.prototype.onDestroy = function (pharmacy) {
        var _this = this;
        this.pharmacyService.destroyPharmacy(pharmacy.id).subscribe(function () {
            _this.pharms = _this.pharms.filter(function (p) { return p !== pharmacy; });
        });
        ymaps.ready().then(function () {
            _this.objectManager.objects.remove(_this.objectManager.objects.getById(pharmacy.id));
        });
    };
    PharmaciesComponent.prototype.ymapsInit = function () {
        var _this = this;
        ymaps.ready().then(function () {
            _this.myMap = new ymaps.Map("mymap", {
                center: [44.578526, 33.532156],
                zoom: 11,
                controls: ['zoomControl', 'fullscreenControl']
            }), _this.objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 32
            });
            //this.objectManager.objects.options.set('preset', 'islands#darkGreenMedicalIcon');
            _this.objectManager.clusters.options.set('preset', 'islands#darkGreenClusterIcons');
            _this.myMap.geoObjects.add(_this.objectManager);
        });
    };
    //сортировка
    PharmaciesComponent.prototype.onSort = function (sortBy) {
        if (this.sortBy === sortBy)
            return;
        this.sortBy = sortBy;
        this.getArea(this.searchTerm, this.areaName, sortBy, this.workTime);
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
        this.getArea(this.searchTerm, this.areaName, this.sortBy, this.workTime);
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
        this.getArea(this.searchTerm, this.areaName, this.sortBy, this.workTime);
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
    PharmaciesComponent.prototype.getPharmaciesBy = function (ids) {
        this.objectManager.setFilter(function (object) {
            return ids.indexOf(object.id) !== -1;
        });
    };
    //запрос о районе на сервер
    PharmaciesComponent.prototype.getArea = function (searchName, area, sortBy, workTime) {
        var _this = this;
        this.pharmacyService.getArea(searchName, area, sortBy, workTime)
            .then(function (data) {
            _this.pharms = data;
            var ids = new Array();
            data.forEach(function (d) {
                ids.push(d.id);
            });
            _this.getPharmaciesBy(ids);
        });
    };
    //отобразить аптеки на карте
    PharmaciesComponent.prototype.pharmsToMap = function () {
        var _this = this;
        ymaps.ready().then(function () {
            var _loop_1 = function(pharm) {
                var myGeocoder = ymaps.geocode("\u0421\u0435\u0432\u0430\u0441\u0442\u043E\u043F\u043E\u043B\u044C, " + pharm.address);
                myGeocoder.then(function (res) {
                    var content = "\n\t            \t\t<h4>" + pharm.name + "</h4>\n\t            \t\t" + pharm.address + "\n\t            \t";
                    var myPlacemark = {
                        "type": "Feature",
                        "id": pharm.id,
                        "geometry": {
                            "type": "Point",
                            "coordinates": res.geoObjects.get(0).geometry.getCoordinates()
                        },
                        "properties": {
                            "balloonContent": content
                        },
                        "options": {
                            "preset": "islands#darkgreenMedicalIcon",
                            "hideIconOnBalloonOpen": true
                        }
                    };
                    _this.objectManager.add(myPlacemark);
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
        __metadata('design:paramtypes', [pharmacy_service_1.PharmacyService, session_service_1.SessionService])
    ], PharmaciesComponent);
    return PharmaciesComponent;
}());
exports.PharmaciesComponent = PharmaciesComponent;
//# sourceMappingURL=pharmacies.component.js.map