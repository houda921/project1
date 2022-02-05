import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy, RouterModule } from '@angular/router';   
import {FormControl} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
//////////////////////////  
//********** */
//import firebase from "firebase/app";
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule ,FormsModule} from '@angular/forms'
//********** */ import {enableProdMode} from '@angular/core'; 
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
//import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth'; 
import { AngularFireModule } from '@angular/fire'; 
//import { environment } from '../environments/environment';
 /////////////////////
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
//import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
//import firebaseConfig from './firebase' 
import { AppPreferences } from '@ionic-native/app-preferences/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder ,NativeGeocoderOptions , NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {Camera ,CameraOptions} from "@ionic-native/camera/ngx"
//import { ParticipantService } from './shared/participant.service'; 
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx'; 
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './shared/authentication.service'; 
import { ImagePicker} from "@ionic-native/image-picker/ngx"
//import { Facebook } from '@ionic-native/facebook/ngx';
//import { Options } from 'selenium-webdriver'; 
import { map } from 'rxjs/operators';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MarkersService } from './services/markers.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'; 
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx'; 
import { firebaseConfig } from 'src/environments/environment.prod'; 
import { AngularFireDatabaseModule } from '@angular/fire/database'; // pour manipuler la base de données Firebase
import { AngularFireStorageModule } from '@angular/fire/storage'; // pour accéder aux fonction de stockage et de récupération des fichiers
//   export const firebaseConfig = {
//   apiKey: '************************************-EjQ',
//   authDomain: 'camera-******.firebaseapp.com',
//   databaseURL: 'https://camera-******.firebaseio.com',
//   projectId: 'camera-******',
//   storageBucket: 'camera-******.appspot.com',
//   messagingSenderId: '************',
//   appId: '1:************:web:************'
// };
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule ,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule , 
    AngularFirestoreModule , 
     
  ReactiveFormsModule , 
  FormsModule   ,   
  HttpClientModule ,   
  AngularFireDatabaseModule,
  AngularFireStorageModule
  //Facebook ,
  ], 
    
  providers: [InAppBrowser ,ImagePicker ,ReactiveFormsModule , StatusBar,LottieSplashScreen ,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ,Geolocation,Camera
     ,GooglePlus ,FormBuilder,AppPreferences ,FormBuilder, Validators, 
    FormControl , FormsModule ,AuthenticationService, NativeGeocoder ,Geolocation ,NativeGeocoder ,MarkersService, FormsModule ,AndroidPermissions,LocationAccuracy, 
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
