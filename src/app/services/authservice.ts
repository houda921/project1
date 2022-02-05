import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth'
//import { GooglePlus } from '@ionic-native/google-plus/ngx'; 
 //import { PowerManagement } from '@ionic-native/power-management/ngx';
 import { GooglePlus } from '@ionic-native/google-plus/ngx';

export  interface UserPro{
  username: string;
  uid: string;
}  
export  interface Marker{ 
  mid:string;
} 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : UserPro;
private marker :Marker ;
  constructor(public auth: AngularFireAuth, public nfFireAuth:AngularFireAuth,private googlePlus: GooglePlus ) { }


  loginFireauth(value){
   return new Promise<any> ( (resolve, reject)=>{
    this.nfFireAuth.signInWithEmailAndPassword(value.email, value.password).then(
       res => resolve(res),
       error => reject(error)
     )
   })
  }


  setUser(user: UserPro){
    return this.user = user;
  }

  getUID(): string{
    return this.user.uid;
  }
 
getMID():string { 
  return this.marker.mid;
}

  userRegistration(value){
    return new Promise<any> ( (resolve, reject)=>{
      this.nfFireAuth.createUserWithEmailAndPassword(value.email,value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }

 GoogleloginAuth(){
   return this.googlePlus.login({
            'scopes':'profile email',
                     
       'webClientId':'206201421419-u1mp61vt8faleo46c8n4lm3hadsam9i7.apps.googleusercontent.com',
       'offline':true
     });
   }
}