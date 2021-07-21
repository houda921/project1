import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Login1PageRoutingModule } from './login1-routing.module';

import { Login1Page } from './login1.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms' ; 
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx'; 
import { StatusBar } from '@ionic-native/status-bar/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Login1PageRoutingModule , 
    ReactiveFormsModule ,
  ],
  declarations: [Login1Page] , 
  providers:[LottieSplashScreen,StatusBar ,GooglePlus ,ReactiveFormsModule]
})
export class Login1PageModule {}
