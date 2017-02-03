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
var PharmaciesComponent = (function () {
    function PharmaciesComponent(elementRef, pharmacyService) {
        this.elementRef = elementRef;
        this.pharmacyService = pharmacyService;
        //change class for selected area
        this.area = 0;
    }
    PharmaciesComponent.prototype.ngAfterViewInit = function () {
        /*ymaps initialzation*/
        /*let ymaps = document.createElement("script");
        ymaps.type = "text/javascript";
        ymaps.src = "ymaps.js";
        this.elementRef.nativeElement.appendChild(ymaps);*/
        /*ymaps.ready().then(() => {
            let myMap = new ymaps.Map("mymap", {
                center: [55.76, 37.64],
                zoom: 7
            });

            let myPlacemark = new ymaps.Placemark([55.76, 37.64], {
                hintContent: 'Москва!',
                balloonContent: 'Столица России'
            });
        });*/
        this.getPharms();
    };
    PharmaciesComponent.prototype.getPharms = function () {
        var _this = this;
        this.pharmacyService.getPharms().subscribe(function (data) {
            _this.pharms = data;
        });
    };
    PharmaciesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pharmacies',
            templateUrl: 'pharmacies.component.html',
            styleUrls: ['pharmacies.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, pharmacy_service_1.PharmacyService])
    ], PharmaciesComponent);
    return PharmaciesComponent;
}());
exports.PharmaciesComponent = PharmaciesComponent;
//# sourceMappingURL=pharmacies.component.js.map