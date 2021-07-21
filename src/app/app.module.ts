import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';   
import {FormControl} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//////////////////////////  
//********** */
//import firebase from "firebase/app";
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule ,FormsModule} from '@angular/forms'
//********** */ import {enableProdMode} from '@angular/core'; 
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth'; 
import { AngularFireModule } from '@angular/fire'; 
//import { environment } from '../environments/environment';
 /////////////////////
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
//import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import firebaseConfig from './firebase' 
import { AppPreferences } from '@ionic-native/app-preferences/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {Camera ,CameraOptions} from "@ionic-native/camera/ngx"
import { ParticipantService } from './shared/participant.service'; 
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx'; 
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './shared/authentication.service';

//import { Options } from 'selenium-webdriver';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule ,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule , 
    AngularFirestoreModule , 
    AngularFireDatabaseModule , 
  ReactiveFormsModule , 
  FormsModule   
   
  ], 
    
  providers: [ReactiveFormsModule , StatusBar,LottieSplashScreen ,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ,Geolocation,Camera,ParticipantService ,GooglePlus ,FormBuilder,AppPreferences ,FormBuilder, Validators, FormControl , FormsModule ,AuthenticationService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
