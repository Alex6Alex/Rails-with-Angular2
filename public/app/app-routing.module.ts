import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { NewPharmacyComponent } from './components/newPharmacy/new.pharmacy.component';
import { EditPharmacyComponent } from './components/editPharmacy/edit.pharmacy.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AtcGroupComponent } from './components/atcGroup/atc.group.component';
import { AtcSubGroupComponent } from './components/atcSubGroup/atc.sub.group.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { EditMedicineComponent } from './components/editMedicine/edit.medicine.component';
import { NewMedicineComponent } from './components/newMedicine/new.medicine.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent } from './components/account/account.component';
import { EditAccountComponent } from './components/editAccount/edit.account.component';
import { UsersComponent } from './components/users/users.component';

import { CanActivateGuard } from './services/can.activate.guard';

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
		path: 'pharmacies/new', 
		component: NewPharmacyComponent
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
		path: 'medicines/new',
		component: NewMedicineComponent//,
		//canActivate: [CanActivateGuard]
	},
	{
		path: 'medicines/:id',
		component: MedicineComponent
	},
	{
		path: 'medicines/:id/edit',
		component: EditMedicineComponent
	},
	{ 
		path: 'signup', 
		component: RegistrationComponent 
	},
	{
		path: 'users',
		component: UsersComponent
	},
	{ 
		path: 'users/:id', 
		component: AccountComponent 
	},
	{ 
		path: 'users/:id/edit', 
		component: EditAccountComponent 
	},
	{
		path: 'pharmacies/:id',
		component: PharmacyComponent
	},
	{
		path: 'pharmacies/:id/edit',
		component: EditPharmacyComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }