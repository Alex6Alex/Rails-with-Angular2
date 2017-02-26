import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AtcGroupComponent } from './components/atcGroup/atc.group.component';
import { AtcSubGroupComponent } from './components/atcSubGroup/atc.sub.group.component';
import { MedicineComponent } from './components/medicine/medicine.component';
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
		component: GroupsComponent 
	},
	{ 
		path: 'groups/:code', 
		component: AtcGroupComponent 
	},
	{
		path: 'groups/:code/:sub_code',
		component: AtcSubGroupComponent
	},
	{
		path: 'groups/:code/:sub_code/:id',
		component: MedicineComponent
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