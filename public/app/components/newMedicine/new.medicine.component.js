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
var NewMedicineComponent = (function () {
    function NewMedicineComponent(router, medicineService, title) {
        this.router = router;
        this.medicineService = medicineService;
        this.title = title;
        this.medicine = new atcGroups_1.Medicine(null, null, null, null, null, null);
    }
    NewMedicineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.medicineService.getGroups().subscribe(function (data) {
            _this.groups = data;
        });
    };
    NewMedicineComponent.prototype.getSubGroups = function (value) {
        var _this = this;
        this.medicineService.getSubGroups("/groups/" + value)
            .subscribe(function (data) {
            _this.subGroups = data.atcSubGroups;
        });
        this.medicine.atc_sub_group_id = null;
    };
    NewMedicineComponent.prototype.newMedicine = function () {
        var _this = this;
        this.medicineService.newMedicine(this.medicine).subscribe(function (data) {
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
    NewMedicineComponent.prototype.onSubmit = function () {
        this.newMedicine();
    };
    NewMedicineComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'new.medicine',
            templateUrl: 'new.medicine.component.html',
            styleUrls: ['new.medicine.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, medicine_service_1.MedicineService, platform_browser_1.Title])
    ], NewMedicineComponent);
    return NewMedicineComponent;
}());
exports.NewMedicineComponent = NewMedicineComponent;
//# sourceMappingURL=new.medicine.component.js.map