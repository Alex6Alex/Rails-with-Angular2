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
var AtcGroupComponent = (function () {
    function AtcGroupComponent(title, router, medicineService, sessionService) {
        this.title = title;
        this.router = router;
        this.medicineService = medicineService;
        this.sessionService = sessionService;
        this.group = new atcGroups_1.Group(null, null, null);
        this.newSubGroup = new atcGroups_1.SubGroup(null, null, null);
    }
    AtcGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSubGroups();
        this.sessionService.isAdmin.subscribe(function (status) {
            _this.canChange = status;
        });
    };
    AtcGroupComponent.prototype.getSubGroups = function () {
        var _this = this;
        this.medicineService.getSubGroups(this.router.url)
            .subscribe(function (data) {
            _this.group = data;
            _this.subGroups = data.atcSubGroups;
            //setTitle(this.group.description);
        });
    };
    AtcGroupComponent.prototype.onRefresh = function () {
        this.newSubGroup = new atcGroups_1.SubGroup(null, null, null);
    };
    //Добавление подгруппы
    AtcGroupComponent.prototype.onSubmit = function () {
        var _this = this;
        this.medicineService.newSubGroup(this.newSubGroup, this.router.url)
            .subscribe(function (data) {
            if (data.status) {
                _this.createDialog = false;
                _this.getSubGroups();
                _this.newSubGroup = new atcGroups_1.SubGroup(null, null, null);
            }
            else {
                console.log(data.errors);
            }
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    //обновление подгруппы
    AtcGroupComponent.prototype.onUpdate = function () {
        var _this = this;
        this.medicineService.updateSubGroup(this.newSubGroup, this.router.url)
            .subscribe(function (data) {
            if (data.status) {
                _this.updateDialog = false;
                _this.getSubGroups();
                _this.newSubGroup = new atcGroups_1.SubGroup(null, null, null);
            }
            else {
                console.log(data.errors);
            }
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    //Удаление подгруппы админом
    AtcGroupComponent.prototype.onDestroy = function (subGroup) {
        var _this = this;
        this.medicineService.destroySubGroup(subGroup.code, this.router.url)
            .subscribe(function () {
            _this.subGroups = _this.subGroups
                .filter(function (s) { return s !== subGroup; });
        });
    };
    AtcGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'atcgroup',
            templateUrl: 'atc.group.component.html',
            styleUrls: ['atc.group.css']
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router, medicine_service_1.MedicineService, session_service_1.SessionService])
    ], AtcGroupComponent);
    return AtcGroupComponent;
}());
exports.AtcGroupComponent = AtcGroupComponent;
//# sourceMappingURL=atc.group.component.js.map