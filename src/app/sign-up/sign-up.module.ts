import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'
import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { Router } from '@angular/router';
import { SignUpPage } from './sign-up.page';
import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule , 
    ReactiveFormsModule ,
    
  ],
  declarations: [SignUpPage] , 
  providers:[FormBuilder]
})
export class SignUpPageModule {}
