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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var PharmacyService = (function () {
    function PharmacyService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    PharmacyService.prototype.getPharms = function () {
        return this.http.get('/pharmacies.json').toPromise()
            .then(function (res) { return res.json(); });
    };
    PharmacyService.prototype.getArea = function (area, sortBy) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({ area: area, order: sortBy });
        return this.http.post('/change_area.json', body, options).toPromise()
            .then(function (res) { return res.json(); });
    };
    PharmacyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], PharmacyService);
    return PharmacyService;
}());
exports.PharmacyService = PharmacyService;
//# sourceMappingURL=pharmacy.service.js.map