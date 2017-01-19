import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { MedicinesComponent } from './components/medicines/medicines.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	AppRoutingModule,
    HttpModule
  ],
  declarations: [ 
  	AppComponent,
  	HomeComponent,
    PharmaciesComponent,
    MedicinesComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }