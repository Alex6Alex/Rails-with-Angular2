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
var session_service_1 = require('../../services/session.service');
var HomeComponent = (function () {
    function HomeComponent(sessionService) {
        this.sessionService = sessionService;
        //session model
        this.session = { email: "", password: "" };
        //sign user or not
        this.sign = false;
        this.m = 0;
        this.user_name = "";
        //pattern for mail
        this.pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        //error if login data invalid
        this.errorLog = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get data from server
        this.sessionService.isSignIn().subscribe(function (data) {
            if (data.sign) {
                //get current user information
                _this.sign = data.sign;
                _this.user_id = data.user.id;
                _this.user_name = data.user.name;
                //function for send bool data to header
                _this.signInState(true);
                _this.m = 2;
                _this.signState();
            }
            else {
                _this.m = 1;
                _this.signState();
            }
        });
    };
    //functon for sign in button
    HomeComponent.prototype.onSubmit = function () {
        this.signIn();
    };
    //function for send bool data to header
    HomeComponent.prototype.signInState = function (value) {
        this.sessionService.signInState.next(value);
    };
    //if log out via header
    HomeComponent.prototype.signState = function () {
        var _this = this;
        this.sessionService.signInState.subscribe(function (status) {
            _this.sign = status;
            if (!_this.sign)
                _this.m = 1;
        });
    };
    //sign registered user in 
    HomeComponent.prototype.signIn = function () {
        var _this = this;
        this.sessionService.signIn(this.session).subscribe(function (data) {
            _this.sign = true;
            //don't show error message
            _this.errorLog = false;
            //get current user information
            _this.user_id = data.id;
            _this.user_name = data.name;
            _this.signInState(true);
            _this.m = 2;
        }, function (error) {
            //show error message
            _this.errorLog = true;
        });
    };
    //exit form system
    HomeComponent.prototype.logOut = function () {
        var _this = this;
        this.sessionService.logOut(this.user_id).subscribe(function (data) {
            _this.sign = false;
            _this.m = 1;
            //send to header
            _this.signInState(false);
            //console.log(data);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.css']
        }), 
        __metadata('design:paramtypes', [session_service_1.SessionService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map