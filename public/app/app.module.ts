import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DropdownModule } from 'ngx-dropdown';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { NewPharmacyComponent, FocusDirective,
        BlurDirective } from './components/newPharmacy/new.pharmacy.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AtcGroupComponent } from './components/atcGroup/atc.group.component';
import { AtcSubGroupComponent } from './components/atcSubGroup/atc.sub.group.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { NewMedicineComponent } from './components/newMedicine/new.medicine.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent} from './components/account/account.component';
import { UsersComponent} from './components/users/users.component';

import { CanActivateGuard } from './services/can.activate.guard';
import { SessionService } from './services/session.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
    ReactiveFormsModule,
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
    NewMedicineComponent,
    RegistrationComponent,
    AccountComponent,
    UsersComponent,
    NewPharmacyComponent,
    FocusDirective,
    BlurDirective
  ],
  bootstrap: [ AppComponent ],
  providers: [ 
    Title,
    CanActivateGuard,
    SessionService
  ]
})

export class AppModule { }