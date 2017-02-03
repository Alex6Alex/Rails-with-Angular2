import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DropdownModule } from 'ngx_dropdown';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
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
    DropdownModule
  ],
  declarations: [ 
  	AppComponent,
  	HomeComponent,
    PharmaciesComponent,
    MedicinesComponent,
    RegistrationComponent,
    AccountComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }