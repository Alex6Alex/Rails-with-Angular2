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
    //для всех аптек
    PharmacyService.prototype.getPharms = function () {
        return this.http.get('/pharmacies.json').toPromise()
            .then(function (res) { return res.json(); });
    };
    PharmacyService.prototype.getArea = function (name, area, sortBy, workTime) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({ name: name, area: area, order: sortBy,
            time: workTime });
        return this.http.post('/change_area.json', body, options).toPromise()
            .then(function (res) { return res.json(); });
    };
    PharmacyService.prototype.search = function (term) {
        var url = '/search_pharms.json';
        var params = new http_1.URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp
            .get(url, { search: params })
            .map(function (res) { return res.json(); });
    };
    //поиск лекарств в определенной аптеке
    PharmacyService.prototype.searchByPharmacy = function (term, id) {
        var url = '/medicine_in_pharmacy.json';
        var params = new http_1.URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('id', id.toString()); //pharmacy id
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp
            .get(url, { search: params })
            .map(function (res) { return res.json(); });
    };
    //новая аптека
    PharmacyService.prototype.newPharmacy = function (pharmacy) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            name: pharmacy.name,
            address: pharmacy.address,
            area: pharmacy.area,
            phone: pharmacy.phone,
            worktime: pharmacy.worktime
        });
        return this.http.post('/pharmacies.json', body, options)
            .map(function (res) { return res.json(); });
    };
    //удаление
    PharmacyService.prototype.destroyPharmacy = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete("/pharmacies/" + id + ".json", options)
            .map(function () { return null; });
    };
    //для отдельной аптеки
    PharmacyService.prototype.getPharmacy = function (path) {
        return this.http.get(path + ".json")
            .map(function (res) { return res.json(); });
    };
    PharmacyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], PharmacyService);
    return PharmacyService;
}());
exports.PharmacyService = PharmacyService;
//# sourceMappingURL=pharmacy.service.js.map