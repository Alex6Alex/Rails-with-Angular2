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
var home_component_1 = require('./components/home/home.component');
var pharmacies_component_1 = require('./components/pharmacies/pharmacies.component');
var pharmacy_component_1 = require('./components/pharmacy/pharmacy.component');
var new_pharmacy_component_1 = require('./components/newPharmacy/new.pharmacy.component');
var groups_component_1 = require('./components/groups/groups.component');
var atc_group_component_1 = require('./components/atcGroup/atc.group.component');
var atc_sub_group_component_1 = require('./components/atcSubGroup/atc.sub.group.component');
var medicine_component_1 = require('./components/medicine/medicine.component');
var registration_component_1 = require('./components/registration/registration.component');
var account_component_1 = require('./components/account/account.component');
var users_component_1 = require('./components/users/users.component');
var routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'pharmacies',
        component: pharmacies_component_1.PharmaciesComponent,
        data: { preload: true }
    },
    {
        path: 'pharmacies/new',
        component: new_pharmacy_component_1.NewPharmacyComponent
    },
    {
        path: 'groups',
        component: groups_component_1.GroupsComponent
    },
    {
        path: 'groups/:code',
        component: atc_group_component_1.AtcGroupComponent
    },
    {
        path: 'groups/:code/:sub_code',
        component: atc_sub_group_component_1.AtcSubGroupComponent
    },
    {
        path: 'medicines/:id',
        component: medicine_component_1.MedicineComponent
    },
    {
        path: 'signup',
        component: registration_component_1.RegistrationComponent
    },
    {
        path: 'users',
        component: users_component_1.UsersComponent
    },
    {
        path: 'users/:id',
        component: account_component_1.AccountComponent
    },
    {
        path: 'pharmacies/:id',
        component: pharmacy_component_1.PharmacyComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map