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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ngx_dropdown_1 = require('ngx-dropdown');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var home_component_1 = require('./components/home/home.component');
var pharmacies_component_1 = require('./components/pharmacies/pharmacies.component');
var pharmacy_component_1 = require('./components/pharmacy/pharmacy.component');
var new_pharmacy_component_1 = require('./components/newPharmacy/new.pharmacy.component');
var edit_pharmacy_component_1 = require('./components/editPharmacy/edit.pharmacy.component');
var groups_component_1 = require('./components/groups/groups.component');
var atc_group_component_1 = require('./components/atcGroup/atc.group.component');
var atc_sub_group_component_1 = require('./components/atcSubGroup/atc.sub.group.component');
var medicine_component_1 = require('./components/medicine/medicine.component');
var edit_medicine_component_1 = require('./components/editMedicine/edit.medicine.component');
var new_medicine_component_1 = require('./components/newMedicine/new.medicine.component');
var registration_component_1 = require('./components/registration/registration.component');
var account_component_1 = require('./components/account/account.component');
var edit_account_component_1 = require('./components/editAccount/edit.account.component');
var users_component_1 = require('./components/users/users.component');
var can_activate_guard_1 = require('./services/can.activate.guard');
var session_service_1 = require('./services/session.service');
var app_routing_module_1 = require('./app-routing.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                ngx_dropdown_1.DropdownModule,
                router_1.RouterModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                pharmacies_component_1.PharmaciesComponent,
                pharmacy_component_1.PharmacyComponent,
                groups_component_1.GroupsComponent,
                atc_group_component_1.AtcGroupComponent,
                atc_sub_group_component_1.AtcSubGroupComponent,
                medicine_component_1.MedicineComponent,
                edit_medicine_component_1.EditMedicineComponent,
                new_medicine_component_1.NewMedicineComponent,
                registration_component_1.RegistrationComponent,
                account_component_1.AccountComponent,
                edit_account_component_1.EditAccountComponent,
                users_component_1.UsersComponent,
                new_pharmacy_component_1.NewPharmacyComponent,
                edit_pharmacy_component_1.EditPharmacyComponent,
                new_pharmacy_component_1.FocusDirective,
                new_pharmacy_component_1.BlurDirective
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                platform_browser_1.Title,
                can_activate_guard_1.CanActivateGuard,
                session_service_1.SessionService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map