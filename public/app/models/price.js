"use strict";
var Price = (function () {
    function Price(id, medicine_id, pharmacy_id, price, count) {
        this.id = id;
        this.medicine_id = medicine_id;
        this.pharmacy_id = pharmacy_id;
        this.price = price;
        this.count = count;
    }
    return Price;
}());
exports.Price = Price;
//# sourceMappingURL=price.js.map