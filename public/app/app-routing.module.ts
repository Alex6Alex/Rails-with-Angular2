import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent} from './components/account/account.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'pharmacies', component: PharmaciesComponent },
	{ path: 'medicines', component: MedicinesComponent },
	{ path: 'signup', component: RegistrationComponent },
	{ path: 'users/:id', component: AccountComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }