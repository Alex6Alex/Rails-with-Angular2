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
var atcGroups_1 = require('../../models/atcGroups');
var AtcGroupComponent = (function () {
    function AtcGroupComponent(title, router, medicineService) {
        this.title = title;
        this.router = router;
        this.medicineService = medicineService;
        this.group = new atcGroups_1.Group(null, null, null);
    }
    AtcGroupComponent.prototype.ngOnInit = function () {
        this.getSubGroups();
    };
    AtcGroupComponent.prototype.getSubGroups = function () {
        var _this = this;
        this.medicineService.getSubGroups(this.router.url)
            .subscribe(function (data) {
            _this.group = data.group;
            _this.subGroups = data.subgroups;
            //setTitle(this.group.description);
        });
    };
    AtcGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'atcgroup',
            templateUrl: 'atc.group.component.html',
            styleUrls: ['atc.group.css']
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router, medicine_service_1.MedicineService])
    ], AtcGroupComponent);
    return AtcGroupComponent;
}());
exports.AtcGroupComponent = AtcGroupComponent;
//# sourceMappingURL=atc.group.component.js.map