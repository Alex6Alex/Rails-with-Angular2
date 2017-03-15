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
var platform_browser_1 = require('@angular/platform-browser');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/map');
var Subject_1 = require('rxjs/Subject');
var medicine_service_1 = require('../../services/medicine.service');
var GroupsComponent = (function () {
    function GroupsComponent(title, medicineService) {
        this.medicineService = medicineService;
        this.showItems = false;
        this.resultsIsShow = false;
        this.searchTerm = null;
        //поиск аптек
        this.searchStream = new Subject_1.Subject();
        //	title.setTitle('Поиск лекарств');
    }
    GroupsComponent.prototype.searchPharm = function (term) {
        this.searchStream.next(term);
    };
    //скрывать результаты поиска, если кликнули на др. объект
    GroupsComponent.prototype.onShowSearchRes = function (value) {
        if (this.resultsIsShow) {
            return;
        }
        ;
        this.showItems = value;
    };
    //результат поиска
    GroupsComponent.prototype.onSubmit = function (value) {
        if (this.searchTerm === value)
            return;
        this.searchTerm = value;
        //this.getArea(this.searchTerm, this.areaName, 
        //			this.sortBy, this.workTime, true);	
    };
    GroupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getGroups();
        this.searchStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) {
            return _this.medicineService.search(term);
        })
            .subscribe(function (res) { _this.items = res; });
    };
    GroupsComponent.prototype.getGroups = function () {
        var _this = this;
        this.medicineService.getGroups()
            .subscribe(function (data) {
            _this.atcGroups = data;
        });
    };
    GroupsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'groups',
            templateUrl: 'groups.component.html',
            styleUrls: ['groups.css']
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, medicine_service_1.MedicineService])
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map