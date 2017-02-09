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
var pharmacy_service_1 = require('./services/pharmacy.service');
var AppComponent = (function () {
    function AppComponent(router, titleService, sessionService) {
        this.router = router;
        this.titleService = titleService;
        this.sessionService = sessionService;
        //sign user or not
        this.sign = false;
    }
    //title for pages
    AppComponent.prototype.setTitle = function (title) {
        this.titleService.setTitle(title);
    };
    ;
    //we need it if reload page which is not home page
    AppComponent.prototype.ngOnInit = function () {
        this.isSignIn();
    };
    //listen changes from another rendering parts
    AppComponent.prototype.ngAfterViewInit = function () {
        this.signState();
    };
    AppComponent.prototype.signState = function () {
        var _this = this;
        this.sessionService.signInState.subscribe(function (status) {
            _this.sign = status;
            if (_this.sign)
                _this.isSignIn();
        });
    };
    //function for send bool data to listen between components
    AppComponent.prototype.signInState = function (value) {
        this.sessionService.signInState.next(value);
    };
    //is user in system
    AppComponent.prototype.isSignIn = function () {
        var _this = this;
        this.sessionService.isSignIn().subscribe(function (data) {
            if (data.sign) {
                //user in system
                _this.sign = data.sign;
                _this.user_id = data.user.id;
                _this.user_name = data.user.name;
            }
        });
    };
    //user exit from system
    AppComponent.prototype.logOut = function () {
        var _this = this;
        this.sessionService.logOut(this.user_id).subscribe(function (data) {
            _this.sign = false;
            _this.signInState(false);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'app.component.html',
            styleUrls: ['../styles.css'],
            providers: [home_service_1.HomeService, session_service_1.SessionService, pharmacy_service_1.PharmacyService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, platform_browser_1.Title, session_service_1.SessionService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map