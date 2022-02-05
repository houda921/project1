import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginscreenPageRoutingModule } from './loginscreen-routing.module';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { LoginscreenPage } from './loginscreen.page'; 
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { AuthenticationService } from '../shared/authentication.service';
import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginscreenPageRoutingModule , 
    ReactiveFormsModule , 
    
  ],
  declarations: [LoginscreenPage] , 
  providers:[StatusBar,LottieSplashScreen]
})
export class LoginscreenPageModule {}
