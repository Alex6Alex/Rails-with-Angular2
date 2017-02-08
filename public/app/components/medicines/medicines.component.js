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
var MedicinesComponent = (function () {
    function MedicinesComponent(title) {
        this.atcGroups = [
            {
                code: 'A',
                path: '/medicines1/A',
                title: 'Пищеварительный тракт и обмен веществ'
            },
            {
                code: 'B',
                path: '/medicines/B',
                title: 'Кроветворение и кровь'
            },
            {
                code: 'C',
                path: '/medicines/C',
                title: 'Сердечно-сосудистая система'
            },
            {
                code: 'D',
                path: '/medicines/D',
                title: 'Дерматологические препараты'
            },
            {
                code: 'G',
                path: '/medicines/G',
                title: 'Mочеполовая система и половые гормоны'
            },
            {
                code: 'H',
                path: '/medicines/H',
                title: 'Гормональные препараты для системного использования, исключая половые гормоны'
            },
            {
                code: 'J',
                path: '/medicines/J',
                title: 'Противомикробные препараты для системного применения'
            },
            {
                code: 'L',
                path: '/medicines/L',
                title: 'Противоопухолевые препараты и иммуномодуляторы'
            },
            {
                code: 'M',
                path: '/medicines/M',
                title: 'Костно-мышечная система'
            },
            {
                code: 'N',
                path: '/medicines/N',
                title: 'Нервная система'
            },
            {
                code: 'P',
                path: '/medicines/P',
                title: 'Противопаразитарные препараты, инсектициды и репелленты'
            },
            {
                code: 'R',
                path: '/medicines/R',
                title: 'Дыхательная система'
            },
            {
                code: 'S',
                path: '/medicines/S',
                title: 'Органы чувств'
            },
            {
                code: 'V',
                path: '/medicines/V',
                title: 'Прочие препараты'
            }
        ];
        //	title.setTitle('Поиск лекарств');
    }
    MedicinesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'medicines',
            templateUrl: 'medicines.component.html',
            styleUrls: ['medicines.css']
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title])
    ], MedicinesComponent);
    return MedicinesComponent;
}());
exports.MedicinesComponent = MedicinesComponent;
//# sourceMappingURL=medicines.component.js.map