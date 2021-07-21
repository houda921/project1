import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule, 
    ReactiveFormsModule
  ], 
  //declarations:[]
   declarations: [MapPage] ,
   providers:[NativeGeocoder]
})
export class MapPageModule {}
