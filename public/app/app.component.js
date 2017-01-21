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
var home_service_1 = require('./services/home.service');
var session_service_1 = require('./services/session.service');
var AppComponent = (function () {
    //router: Router;
    function AppComponent(router, titleService) {
        this.router = router;
        this.titleService = titleService;
        //this.router = _router;
    }
    AppComponent.prototype.setTitle = function (title) {
        this.titleService.setTitle(title);
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'app.component.html',
            styleUrls: ['../styles.css'],
            providers: [home_service_1.HomeService, session_service_1.SessionService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, platform_browser_1.Title])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map