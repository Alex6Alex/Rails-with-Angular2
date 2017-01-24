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
    function AppComponent(router, titleService, sessionService) {
        this.router = router;
        this.titleService = titleService;
        this.sessionService = sessionService;
    }
    AppComponent.prototype.setTitle = function (title) {
        this.titleService.setTitle(title);
    };
    ;
    AppComponent.prototype.ngOnInit = function () {
        this.sign_in();
    };
    AppComponent.prototype.sign_in = function () {
        var _this = this;
        this.sessionService.sign_in().subscribe(function (data) {
            _this.sign = data;
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'app.component.html',
            styleUrls: ['../styles.css'],
            providers: [home_service_1.HomeService, session_service_1.SessionService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, platform_browser_1.Title, session_service_1.SessionService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map