import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DropdownModule } from 'ngx-dropdown';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AtcGroupComponent } from './components/atcGroup/atc.group.component';
import { AtcSubGroupComponent } from './components/atcSubGroup/atc.sub.group.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent} from './components/account/account.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	AppRoutingModule,
    HttpModule,
    JsonpModule,
    DropdownModule,
    RouterModule
  ],
  declarations: [ 
  	AppComponent,
  	HomeComponent,
    PharmaciesComponent,
    PharmacyComponent,
    GroupsComponent,
    AtcGroupComponent,
    AtcSubGroupComponent,
    MedicineComponent,
    RegistrationComponent,
    AccountComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ Title ]
})

export class AppModule { }