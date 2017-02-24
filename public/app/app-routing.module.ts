import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { AtcGroupComponent } from './components/atcGroup/atc.group.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent} from './components/account/account.component';

const routes: Routes = [
	{ 
		path: '', 
		redirectTo: '/home', 
		pathMatch: 'full' 
	},
	{ 
		path: 'home', 
		component: HomeComponent 
	},
	{ 
		path: 'pharmacies', 
		component: PharmaciesComponent,
		data: { preload: true } 
	},
	{ 
		path: 'groups', 
		component: MedicinesComponent 
	},
	{ 
		path: 'groups/:code', 
		component: AtcGroupComponent 
	},
	{
		path: 'medicines/:group/:subgroup',
		component: AtcGroupComponent
	},
	{ 
		path: 'signup', 
		component: RegistrationComponent 
	},
	{ 
		path: 'users/:id', 
		component: AccountComponent 
	},
	{
		path: 'pharmacies/:id',
		component: PharmacyComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }