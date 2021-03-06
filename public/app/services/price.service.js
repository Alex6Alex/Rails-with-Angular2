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
var PriceService = (function () {
    function PriceService(http, jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    //новая цена в аптеке
    PriceService.prototype.newPrice = function (price) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            price: price
        });
        return this.http.post('/price_lists.json', body, options)
            .map(function (res) { return res.json(); });
    };
    //заказ
    PriceService.prototype.reservePrice = function (user_id, price_list_id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            reservation: {
                user_id: user_id,
                price_list_id: price_list_id
            }
        });
        return this.http.post('/reservations.json', body, options)
            .map(function (res) { return res.json(); });
    };
    //все заказы пользователя
    PriceService.prototype.getReservations = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({
            id: id
        });
        return this.http.post('/user_reservations.json', body, options)
            .map(function (res) { return res.json(); });
        ;
    };
    //удаление
    PriceService.prototype.destroyPrice = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete("/price_lists/" + id + ".json", options)
            .map(function () { return null; });
    };
    PriceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_1.Jsonp])
    ], PriceService);
    return PriceService;
}());
exports.PriceService = PriceService;
//# sourceMappingURL=price.service.js.map