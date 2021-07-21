import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'; 

import { Router } from '@angular/router';
//import { sign } from 'crypto';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
userData:any; 
  ngFireAuth: any;
  constructor(  
    //private firebaseAuthentication: FirebaseAuthentication
    public afStore:AngularFirestore, 
    public nfFireAuth:AngularFireAuth, 
    public router:Router
  ) {  
    this.nfFireAuth.authState.subscribe(user=>{ 
      if (user )  //if the user exist 
      { 
        this.userData=user 
        //we want to store the data in the application too so we use the localStorage
        localStorage.setItem('user',JSON.stringify(this.userData))  
         //the parse to translate the information
        JSON.parse(localStorage.getItem('user'))
      } 
      else {  
        
        localStorage.setItem('user',null)  
        JSON.parse(localStorage.getItem('user'))
      }
    }) 


    
  } 
  signIn(email:string, password:string)
  { 
    return this.nfFireAuth.signInWithEmailAndPassword(email , password)
  } 
  registerUser(email:string , password:string )
  {  
    
    return this.nfFireAuth.createUserWithEmailAndPassword(email,password) 
  }  
  // to verify something 
  get isloggedIn( ):boolean{ 
    const user = JSON.parse(localStorage.getItem('user'))  
    //if the user equal to null so it's true but if the user isn't true so the result is false
    return (user !==null)? true :false 
  }  
  // to set the user in the database (firebase)
  setUserData(user:any){  
    //firestoredocument cuz we will send more than an information  
    //we will store our user info in .doc(...)
    const userRef:AngularFirestoreDocument<any> = this.afStore.doc('user/${user.id}')  
    //this userdata is not the userdata in the beginning of the function 
    const userData:User = {  
      uid:user.uid, 
    email:user.email, 
    name:user.name, 
   displayName:user.displayName,
    photoURl:user.photoURl, 


    } 
return user.set(userData,{ 
  merge:true// if the user exist 
})
  } 
  signOut()
  { 
    return this.nfFireAuth.signOut().then(()=>{ 
      localStorage.removeItem('user') 
      localStorage.removeItem('uid') 
      this.router.navigate(['login'])//we use the [ ] cuz this is a router
    })
  }
}
