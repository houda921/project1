import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule ,
    ReactiveFormsModule
  ], 
  exports:[],
  declarations: [RegistrationPage], 
  providers:[ AngularFireAuth ]
})
export class RegistrationPageModule {}
