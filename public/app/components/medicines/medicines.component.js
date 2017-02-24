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
var medicine_service_1 = require('../../services/medicine.service');
var MedicinesComponent = (function () {
    function MedicinesComponent(title, medicineService) {
        this.medicineService = medicineService;
        //	title.setTitle('Поиск лекарств');
    }
    MedicinesComponent.prototype.ngOnInit = function () {
        this.getGroups();
    };
    MedicinesComponent.prototype.getGroups = function () {
        var _this = this;
        this.medicineService.getGroups()
            .subscribe(function (data) {
            _this.atcGroups = data;
        });
    };
    MedicinesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'medicines',
            templateUrl: 'medicines.component.html',
            styleUrls: ['medicines.css']
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, medicine_service_1.MedicineService])
    ], MedicinesComponent);
    return MedicinesComponent;
}());
exports.MedicinesComponent = MedicinesComponent;
//# sourceMappingURL=medicines.component.js.map