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
var EditMedicineComponent = (function () {
    function EditMedicineComponent(router, medicineService, title) {
        this.router = router;
        this.medicineService = medicineService;
        this.title = title;
        this.medicine = new atcGroups_1.Medicine(null, null, null, null, null, null);
        this.subGroups = [];
    }
    EditMedicineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.medicineService.getMedicine(this.router.url).subscribe(function (data) {
            _this.medicine = data;
            _this.medicine.pack = data.package;
            _this.subGroups[0] = data.atcSubGroup;
        });
        this.medicineService.getGroups().subscribe(function (data) {
            _this.groups = data;
        });
    };
    EditMedicineComponent.prototype.getSubGroups = function (value) {
        var _this = this;
        this.medicineService.getSubGroups("/groups/" + value)
            .subscribe(function (data) {
            _this.subGroups = data.atcSubGroups;
        });
        this.medicine.atc_sub_group_id = null;
    };
    EditMedicineComponent.prototype.updateMedicine = function () {
        var _this = this;
        this.medicineService.updateMedicine(this.medicine).subscribe(function (data) {
            if (data.status) {
                _this.router.navigateByUrl("/medicines/" + data.id);
            }
            else {
                console.log(data.errors);
            }
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    EditMedicineComponent.prototype.onUpdate = function () {
        this.updateMedicine();
    };
    EditMedicineComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'edit.medicine',
            templateUrl: 'edit.medicine.component.html',
            styleUrls: ['edit.medicine.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, medicine_service_1.MedicineService, platform_browser_1.Title])
    ], EditMedicineComponent);
    return EditMedicineComponent;
}());
exports.EditMedicineComponent = EditMedicineComponent;
//# sourceMappingURL=edit.medicine.component.js.map