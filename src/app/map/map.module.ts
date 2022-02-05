import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';

import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    
    
  ], 
  //declarations:[]
   declarations: [MapPage ] ,
   providers:[NativeGeocoder ,HttpClientModule]
})
export class MapPageModule {}
