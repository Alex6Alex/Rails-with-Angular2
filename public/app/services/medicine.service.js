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
var http_1 = require('@angular/http');
var MedicineService = (function () {
    function MedicineService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    //основная классификация
    MedicineService.prototype.getGroups = function () {
        return this.http.get('/groups.json')
            .map(function (res) { return res.json(); });
    };
    //подгруппы
    MedicineService.prototype.getSubGroups = function (path) {
        return this.http.get(path + ".json")
            .map(function (res) { return res.json(); });
    };
    //лекарства из подгруппы
    MedicineService.prototype.getMedicines = function (path) {
        return this.http.get(path + ".json")
            .map(function (res) { return res.json(); });
    };
    //лекарство
    MedicineService.prototype.getMedicine = function (path) {
        return this.http.get(path + ".json")
            .map(function (res) { return res.json(); });
    };
    //сортировка
    MedicineService.prototype.setOrder = function (order, time, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({ order: order, time: time, id: id });
        return this.http.post('/ordering.json', body, options)
            .map(function (res) { return res.json(); });
    };
    //новая подгруппа
    MedicineService.prototype.newSubGroup = function (subGroup, url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            subGroup: subGroup
        });
        return this.http.post(url + ".json", body, options)
            .map(function (res) { return res.json(); });
    };
    //обновление подгруппы
    MedicineService.prototype.updateSubGroup = function (subGroup, url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            subGroup: subGroup
        });
        return this.http.put(url + "/" + subGroup.code + ".json", body, options)
            .map(function (res) { return res.json(); });
    };
    //новое лекарство
    MedicineService.prototype.newMedicine = function (medicine) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            medicine: medicine,
            pack: medicine.pack
        });
        return this.http.post('/medicines.json', body, options)
            .map(function (res) { return res.json(); });
    };
    //измененное лекарство
    MedicineService.prototype.updateMedicine = function (medicine) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            medicine: medicine
        });
        return this.http.put("/medicines/" + medicine.id + ".json", body, options)
            .map(function (res) { return res.json(); });
    };
    //поиск лекарств
    MedicineService.prototype.search = function (term) {
        var url = '/search_medicines.json';
        var params = new http_1.URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp
            .get(url, { search: params })
            .map(function (res) { return res.json(); });
    };
    //Удаление препарата
    MedicineService.prototype.destroyMedicine = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete("medicines/" + id + ".json", options)
            .map(function () { return null; });
    };
    //Удаление подгруппы
    MedicineService.prototype.destroySubGroup = function (code, url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(url + "/" + code + ".json", options)
            .map(function () { return null; });
    };
    MedicineService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], MedicineService);
    return MedicineService;
}());
exports.MedicineService = MedicineService;
//# sourceMappingURL=medicine.service.js.map